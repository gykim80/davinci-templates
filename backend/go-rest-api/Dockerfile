# 빌드 스테이지
FROM golang:1.22-alpine AS builder

WORKDIR /app

# 의존성 캐싱을 위해 go.mod/go.sum 먼저 복사
COPY go.mod go.sum ./
RUN go mod download

# 소스 코드 복사 및 빌드
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server ./cmd/app

# 실행 스테이지 (최소 이미지)
FROM alpine:3.20

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

# 빌드된 바이너리와 마이그레이션 파일 복사
COPY --from=builder /app/server .
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080

ENTRYPOINT ["./server"]
