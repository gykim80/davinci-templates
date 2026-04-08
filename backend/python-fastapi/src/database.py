from typing import Generator
from sqlmodel import Session, SQLModel, create_engine

from .config import settings

# SQLModel 엔진 생성
engine = create_engine(
    settings.database_url,
    echo=settings.debug,
    connect_args={"check_same_thread": False},  # SQLite 전용
)


def create_db_and_tables() -> None:
    """데이터베이스 테이블 생성"""
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """FastAPI 의존성 주입용 DB 세션"""
    with Session(engine) as session:
        yield session
