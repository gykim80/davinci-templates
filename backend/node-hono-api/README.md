# Node Hono API Template

Hono + TypeScript + Drizzle ORM (SQLite) starter template.

## Stack

- **Hono** — fast, lightweight web framework
- **Drizzle ORM** — type-safe SQL ORM
- **better-sqlite3** — SQLite driver
- **zod** — runtime validation
- **tsx** — TypeScript execution

## Quick Start

```bash
# 의존성 설치
npm install

# DB 마이그레이션 생성 및 적용
npm run db:generate
npm run db:migrate

# 개발 서버 실행 (hot reload)
npm run dev
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Root |
| GET | `/health` | Health check |
| GET | `/items` | List items |
| POST | `/items` | Create item |
| GET | `/items/:id` | Get item |
| PATCH | `/items/:id` | Update item |
| DELETE | `/items/:id` | Delete item |

## Docker

```bash
docker build -t hono-api .
docker run -p 3000:3000 hono-api
```

## Environment Variables

```env
PORT=3000
APP_NAME=Hono API
DATABASE_URL=./app.db
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```
