package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/your-org/app/internal/usecase"
)

// UserHandler 는 사용자 관련 HTTP 핸들러이다.
type UserHandler struct {
	uc        *usecase.UserUsecase
	jwtSecret string
	jwtExpire int // 시간 단위
}

// NewUserHandler 는 UserHandler 인스턴스를 생성한다.
func NewUserHandler(uc *usecase.UserUsecase, jwtSecret string, jwtExpire int) *UserHandler {
	return &UserHandler{uc: uc, jwtSecret: jwtSecret, jwtExpire: jwtExpire}
}

// registerRequest 는 회원가입 요청 바디이다.
type registerRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name" binding:"required"`
}

// loginRequest 는 로그인 요청 바디이다.
type loginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// updateRequest 는 사용자 수정 요청 바디이다.
type updateRequest struct {
	Name string `json:"name" binding:"required"`
}

// Register godoc
// @Summary     회원가입
// @Description 새 사용자를 등록한다
// @Tags        auth
// @Accept      json
// @Produce     json
// @Param       body body registerRequest true "회원가입 정보"
// @Success     201 {object} entity.User
// @Failure     400 {object} map[string]string
// @Failure     409 {object} map[string]string
// @Router      /api/v1/auth/register [post]
func (h *UserHandler) Register(c *gin.Context) {
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.uc.Register(c.Request.Context(), req.Email, req.Password, req.Name)
	if err != nil {
		if err == usecase.ErrEmailExists {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "서버 오류"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// Login godoc
// @Summary     로그인
// @Description 이메일과 비밀번호로 인증하고 JWT 토큰을 반환한다
// @Tags        auth
// @Accept      json
// @Produce     json
// @Param       body body loginRequest true "로그인 정보"
// @Success     200 {object} map[string]string
// @Failure     401 {object} map[string]string
// @Router      /api/v1/auth/login [post]
func (h *UserHandler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.uc.Login(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "이메일 또는 비밀번호가 올바르지 않습니다"})
		return
	}

	// JWT 토큰 생성
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Duration(h.jwtExpire) * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString([]byte(h.jwtSecret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "토큰 생성 실패"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// GetAll godoc
// @Summary     사용자 목록 조회
// @Description 전체 사용자 목록을 반환한다
// @Tags        users
// @Produce     json
// @Security    BearerAuth
// @Success     200 {array} entity.User
// @Router      /api/v1/users [get]
func (h *UserHandler) GetAll(c *gin.Context) {
	users, err := h.uc.GetAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "조회 실패"})
		return
	}
	c.JSON(http.StatusOK, users)
}

// GetByID godoc
// @Summary     사용자 단건 조회
// @Description ID로 사용자를 조회한다
// @Tags        users
// @Produce     json
// @Security    BearerAuth
// @Param       id path int true "사용자 ID"
// @Success     200 {object} entity.User
// @Failure     404 {object} map[string]string
// @Router      /api/v1/users/{id} [get]
func (h *UserHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "잘못된 ID 형식"})
		return
	}

	user, err := h.uc.GetByID(c.Request.Context(), uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Update godoc
// @Summary     사용자 수정
// @Description 사용자 정보를 수정한다
// @Tags        users
// @Accept      json
// @Produce     json
// @Security    BearerAuth
// @Param       id path int true "사용자 ID"
// @Param       body body updateRequest true "수정할 정보"
// @Success     200 {object} entity.User
// @Failure     404 {object} map[string]string
// @Router      /api/v1/users/{id} [put]
func (h *UserHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "잘못된 ID 형식"})
		return
	}

	var req updateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.uc.Update(c.Request.Context(), uint(id), req.Name)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}

// Delete godoc
// @Summary     사용자 삭제
// @Description 사용자를 삭제한다 (소프트 삭제)
// @Tags        users
// @Produce     json
// @Security    BearerAuth
// @Param       id path int true "사용자 ID"
// @Success     200 {object} map[string]string
// @Failure     404 {object} map[string]string
// @Router      /api/v1/users/{id} [delete]
func (h *UserHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "잘못된 ID 형식"})
		return
	}

	if err := h.uc.Delete(c.Request.Context(), uint(id)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("사용자(id=%d) 삭제 완료", id)})
}
