package usecase

import (
	"context"
	"errors"
	"fmt"

	"github.com/your-org/app/internal/entity"
	"golang.org/x/crypto/bcrypt"
)

// 비즈니스 로직 에러 정의
var (
	ErrUserNotFound    = errors.New("사용자를 찾을 수 없습니다")
	ErrEmailExists     = errors.New("이미 사용하는 이메일입니다")
	ErrInvalidPassword = errors.New("비밀번호가 올바르지 않습니다")
)

// UserUsecase 는 사용자 관련 비즈니스 로직을 담당한다.
type UserUsecase struct {
	repo UserRepository
}

// NewUserUsecase 는 UserUsecase 인스턴스를 생성한다.
func NewUserUsecase(repo UserRepository) *UserUsecase {
	return &UserUsecase{repo: repo}
}

// Register 는 새 사용자를 등록한다. 비밀번호는 bcrypt로 해싱한다.
func (uc *UserUsecase) Register(ctx context.Context, email, password, name string) (*entity.User, error) {
	// 이메일 중복 확인
	existing, _ := uc.repo.FindByEmail(ctx, email)
	if existing != nil {
		return nil, ErrEmailExists
	}

	// 비밀번호 해싱
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("비밀번호 해싱 실패: %w", err)
	}

	user := &entity.User{
		Email:    email,
		Password: string(hashed),
		Name:     name,
	}

	if err := uc.repo.Create(ctx, user); err != nil {
		return nil, fmt.Errorf("사용자 생성 실패: %w", err)
	}

	return user, nil
}

// Login 은 이메일과 비밀번호로 사용자를 인증한다.
func (uc *UserUsecase) Login(ctx context.Context, email, password string) (*entity.User, error) {
	user, err := uc.repo.FindByEmail(ctx, email)
	if err != nil || user == nil {
		return nil, ErrUserNotFound
	}

	// bcrypt 비밀번호 검증
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, ErrInvalidPassword
	}

	return user, nil
}

// GetByID 는 ID로 사용자를 조회한다.
func (uc *UserUsecase) GetByID(ctx context.Context, id uint) (*entity.User, error) {
	user, err := uc.repo.FindByID(ctx, id)
	if err != nil {
		return nil, ErrUserNotFound
	}
	return user, nil
}

// GetAll 은 전체 사용자 목록을 반환한다.
func (uc *UserUsecase) GetAll(ctx context.Context) ([]entity.User, error) {
	return uc.repo.FindAll(ctx)
}

// Update 는 사용자 정보를 수정한다.
func (uc *UserUsecase) Update(ctx context.Context, id uint, name string) (*entity.User, error) {
	user, err := uc.repo.FindByID(ctx, id)
	if err != nil {
		return nil, ErrUserNotFound
	}

	user.Name = name
	if err := uc.repo.Update(ctx, user); err != nil {
		return nil, fmt.Errorf("사용자 수정 실패: %w", err)
	}

	return user, nil
}

// Delete 는 사용자를 삭제한다.
func (uc *UserUsecase) Delete(ctx context.Context, id uint) error {
	if _, err := uc.repo.FindByID(ctx, id); err != nil {
		return ErrUserNotFound
	}
	return uc.repo.Delete(ctx, id)
}
