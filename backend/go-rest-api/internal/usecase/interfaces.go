package usecase

import (
	"context"

	"github.com/your-org/app/internal/entity"
)

// UserRepository 는 사용자 데이터 접근을 위한 인터페이스이다.
// Clean Architecture 원칙에 따라 usecase 패키지에 정의한다.
type UserRepository interface {
	// Create 는 새 사용자를 생성한다.
	Create(ctx context.Context, user *entity.User) error
	// FindByID 는 ID로 사용자를 조회한다.
	FindByID(ctx context.Context, id uint) (*entity.User, error)
	// FindByEmail 은 이메일로 사용자를 조회한다.
	FindByEmail(ctx context.Context, email string) (*entity.User, error)
	// FindAll 은 모든 사용자 목록을 반환한다.
	FindAll(ctx context.Context) ([]entity.User, error)
	// Update 는 사용자 정보를 수정한다.
	Update(ctx context.Context, user *entity.User) error
	// Delete 는 사용자를 삭제한다 (소프트 삭제).
	Delete(ctx context.Context, id uint) error
}
