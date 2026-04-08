.PHONY: run build test migrate-up migrate-down swag docker-up docker-down lint

# 로컬 실행
run:
	go run ./cmd/app

# 바이너리 빌드
build:
	CGO_ENABLED=0 go build -ldflags="-s -w" -o bin/server ./cmd/app

# 테스트 실행
test:
	go test -v -race ./...

# 마이그레이션 적용
migrate-up:
	migrate -path migrations -database "postgres://postgres:password@localhost:5432/app_db?sslmode=disable" up

# 마이그레이션 롤백
migrate-down:
	migrate -path migrations -database "postgres://postgres:password@localhost:5432/app_db?sslmode=disable" down 1

# Swagger 문서 생성
swag:
	swag init -g cmd/app/main.go -o docs

# Docker Compose 실행
docker-up:
	docker compose up -d --build

# Docker Compose 중지
docker-down:
	docker compose down

# 린트 실행
lint:
	golangci-lint run ./...
