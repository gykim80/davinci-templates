# Go REST API Template

Clean Architecture 기반 Go REST API 템플릿.

## 기술 스택

- **HTTP**: gin-gonic/gin v1.10+
- **ORM**: gorm.io/gorm v1.25+
- **DB**: PostgreSQL 16
- **Auth**: golang-jwt/jwt/v5 (JWT)
- **Migration**: golang-migrate/migrate v4
- **Docs**: swaggo/swag + gin-swagger
- **Logging**: rs/zerolog
- **Config**: caarlos0/env v11

## 시작하기

```bash
# 환경 변수 설정
cp .env.example .env

# Docker로 실행 (PostgreSQL + App)
make docker-up

# 또는 로컬 실행 (PostgreSQL 필요)
make run
```

## API 엔드포인트

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /health | - | 헬스 체크 |
| GET | /swagger/* | - | Swagger UI |
| POST | /api/v1/auth/register | - | 회원가입 |
| POST | /api/v1/auth/login | - | 로그인 (JWT 발급) |
| GET | /api/v1/users | JWT | 사용자 목록 |
| GET | /api/v1/users/:id | JWT | 사용자 조회 |
| PUT | /api/v1/users/:id | JWT | 사용자 수정 |
| DELETE | /api/v1/users/:id | JWT | 사용자 삭제 |

## 개발 명령어

```bash
make run          # 로컬 실행
make build        # 바이너리 빌드
make test         # 테스트
make swag         # Swagger 문서 생성
make lint         # 린트
make migrate-up   # 마이그레이션 적용
make migrate-down # 마이그레이션 롤백
make docker-up    # Docker 실행
make docker-down  # Docker 중지
```

## 프로젝트 구조

```
cmd/app/main.go          # 서버 진입점 + 의존성 주입
internal/
  entity/                # 도메인 모델
  usecase/               # 비즈니스 로직 + 리포지토리 인터페이스
  handler/               # HTTP 핸들러 + 라우터
  repo/                  # GORM 리포지토리 구현체
  middleware/             # JWT, CORS, 로깅 미들웨어
config/                  # 환경 변수 설정
migrations/              # SQL 마이그레이션 파일
```
