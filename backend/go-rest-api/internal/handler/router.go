package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/your-org/app/internal/middleware"
)

// NewRouter 는 Gin 라우터를 생성하고 모든 엔드포인트를 등록한다.
func NewRouter(
	logger zerolog.Logger,
	jwtSecret string,
	healthHandler *HealthHandler,
	userHandler *UserHandler,
) *gin.Engine {
	// 프로덕션 모드 설정
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	// 글로벌 미들웨어 적용
	r.Use(gin.Recovery())
	r.Use(middleware.CORS())
	r.Use(middleware.RequestLogger(logger))

	// 인증 불필요 엔드포인트
	r.GET("/health", healthHandler.Health)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// API v1 그룹
	v1 := r.Group("/api/v1")
	{
		// 인증 관련 (JWT 불필요)
		auth := v1.Group("/auth")
		{
			auth.POST("/register", userHandler.Register)
			auth.POST("/login", userHandler.Login)
		}

		// 사용자 관련 (JWT 필요)
		users := v1.Group("/users")
		users.Use(middleware.JWTAuth(jwtSecret))
		{
			users.GET("", userHandler.GetAll)
			users.GET("/:id", userHandler.GetByID)
			users.PUT("/:id", userHandler.Update)
			users.DELETE("/:id", userHandler.Delete)
		}
	}

	return r
}
