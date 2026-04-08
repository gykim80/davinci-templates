package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/rs/zerolog"
	"github.com/your-org/app/config"
	"github.com/your-org/app/internal/entity"
	"github.com/your-org/app/internal/handler"
	"github.com/your-org/app/internal/repo"
	"github.com/your-org/app/internal/usecase"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// @title       Go REST API
// @version     1.0
// @description Clean Architecture 기반 Go REST API 템플릿
// @host        localhost:8080
// @BasePath    /
// @securityDefinitions.apikey BearerAuth
// @in   header
// @name Authorization

func main() {
	// 로거 초기화
	logger := zerolog.New(os.Stdout).With().Timestamp().Logger()

	// 설정 로드
	cfg, err := config.Load()
	if err != nil {
		logger.Fatal().Err(err).Msg("설정 로드 실패")
	}

	// 로그 레벨 설정
	level, _ := zerolog.ParseLevel(cfg.LogLevel)
	zerolog.SetGlobalLevel(level)

	// 데이터베이스 연결
	db, err := gorm.Open(postgres.Open(cfg.DSN()), &gorm.Config{})
	if err != nil {
		logger.Fatal().Err(err).Msg("데이터베이스 연결 실패")
	}
	logger.Info().Msg("데이터베이스 연결 성공")

	// 개발 환경: AutoMigrate (프로덕션에서는 golang-migrate 사용)
	if err := db.AutoMigrate(&entity.User{}); err != nil {
		logger.Fatal().Err(err).Msg("AutoMigrate 실패")
	}

	// 의존성 주입 (Clean Architecture)
	userRepo := repo.NewUserRepo(db)
	userUC := usecase.NewUserUsecase(userRepo)

	healthHandler := handler.NewHealthHandler()
	userHandler := handler.NewUserHandler(userUC, cfg.JWTSecret, cfg.JWTExpireHour)

	// 라우터 설정
	router := handler.NewRouter(logger, cfg.JWTSecret, healthHandler, userHandler)

	// HTTP 서버 생성
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", cfg.AppPort),
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// 서버 시작 (고루틴)
	go func() {
		logger.Info().Str("port", cfg.AppPort).Msg("서버 시작")
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal().Err(err).Msg("서버 실행 실패")
		}
	}()

	// 그레이스풀 종료 대기
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logger.Info().Msg("서버 종료 시작...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal().Err(err).Msg("서버 강제 종료")
	}
	logger.Info().Msg("서버 종료 완료")
}
