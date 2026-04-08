from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from .config import settings
from .database import create_db_and_tables, get_session
from .models import Item, ItemCreate, ItemRead, ItemUpdate


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # 앱 시작 시 DB 테이블 생성
    create_db_and_tables()
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": f"Welcome to {settings.app_name}", "version": settings.app_version}


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/items", response_model=list[ItemRead])
async def list_items(
    skip: int = 0,
    limit: int = 20,
    session: Session = Depends(get_session),
) -> list[Item]:
    items = session.exec(select(Item).offset(skip).limit(limit)).all()
    return list(items)


@app.post("/items", response_model=ItemRead, status_code=201)
async def create_item(
    item_data: ItemCreate,
    session: Session = Depends(get_session),
) -> Item:
    item = Item.model_validate(item_data)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@app.get("/items/{item_id}", response_model=ItemRead)
async def get_item(
    item_id: int,
    session: Session = Depends(get_session),
) -> Item:
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.patch("/items/{item_id}", response_model=ItemRead)
async def update_item(
    item_id: int,
    item_data: ItemUpdate,
    session: Session = Depends(get_session),
) -> Item:
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    update_data = item_data.model_dump(exclude_unset=True)
    item.sqlmodel_update(update_data)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item
