package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HealthHandler 는 헬스 체크 핸들러이다.
type HealthHandler struct{}

// NewHealthHandler 는 HealthHandler 인스턴스를 생성한다.
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// Health godoc
// @Summary     헬스 체크
// @Description 서버 상태를 확인한다
// @Tags        health
// @Produce     json
// @Success     200 {object} map[string]string
// @Router      /health [get]
func (h *HealthHandler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
