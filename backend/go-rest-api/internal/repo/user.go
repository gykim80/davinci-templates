package repo

import (
	"context"
	"fmt"

	"github.com/your-org/app/internal/entity"
	"gorm.io/gorm"
)

// UserRepo 는 GORM 기반 사용자 리포지토리 구현체이다.
type UserRepo struct {
	db *gorm.DB
}

// NewUserRepo 는 UserRepo 인스턴스를 생성한다.
func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

// Create 는 새 사용자를 DB에 저장한다.
func (r *UserRepo) Create(ctx context.Context, user *entity.User) error {
	if err := r.db.WithContext(ctx).Create(user).Error; err != nil {
		return fmt.Errorf("사용자 저장 실패: %w", err)
	}
	return nil
}

// FindByID 는 ID로 사용자를 조회한다.
func (r *UserRepo) FindByID(ctx context.Context, id uint) (*entity.User, error) {
	var user entity.User
	if err := r.db.WithContext(ctx).First(&user, id).Error; err != nil {
		return nil, fmt.Errorf("사용자 조회 실패 (id=%d): %w", id, err)
	}
	return &user, nil
}

// FindByEmail 은 이메일로 사용자를 조회한다.
func (r *UserRepo) FindByEmail(ctx context.Context, email string) (*entity.User, error) {
	var user entity.User
	if err := r.db.WithContext(ctx).Where("email = ?", email).First(&user).Error; err != nil {
		return nil, fmt.Errorf("사용자 조회 실패 (email=%s): %w", email, err)
	}
	return &user, nil
}

// FindAll 은 모든 사용자를 조회한다.
func (r *UserRepo) FindAll(ctx context.Context) ([]entity.User, error) {
	var users []entity.User
	if err := r.db.WithContext(ctx).Find(&users).Error; err != nil {
		return nil, fmt.Errorf("사용자 목록 조회 실패: %w", err)
	}
	return users, nil
}

// Update 는 사용자 정보를 수정한다.
func (r *UserRepo) Update(ctx context.Context, user *entity.User) error {
	if err := r.db.WithContext(ctx).Save(user).Error; err != nil {
		return fmt.Errorf("사용자 수정 실패: %w", err)
	}
	return nil
}

// Delete 는 사용자를 소프트 삭제한다.
func (r *UserRepo) Delete(ctx context.Context, id uint) error {
	if err := r.db.WithContext(ctx).Delete(&entity.User{}, id).Error; err != nil {
		return fmt.Errorf("사용자 삭제 실패: %w", err)
	}
	return nil
}
