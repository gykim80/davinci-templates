# Python FastAPI Template

FastAPI + SQLModel + Pydantic v2 starter template.

## Stack

- **FastAPI** — async web framework
- **SQLModel** — ORM (Pydantic + SQLAlchemy)
- **pydantic-settings** — env-based config
- **uvicorn** — ASGI server

## Quick Start

```bash
# 의존성 설치
uv pip install -e ".[dev]"

# 개발 서버 실행
uvicorn src.main:app --reload

# API 문서
open http://localhost:8000/docs
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Root |
| GET | `/health` | Health check |
| GET | `/items` | List items |
| POST | `/items` | Create item |
| GET | `/items/{id}` | Get item |
| PATCH | `/items/{id}` | Update item |

## Docker

```bash
docker build -t fastapi-app .
docker run -p 8000:8000 fastapi-app
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
DEBUG=false
DATABASE_URL=sqlite:///./app.db
ALLOWED_ORIGINS=["http://localhost:3000"]
```
