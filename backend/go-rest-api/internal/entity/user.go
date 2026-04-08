package entity

import (
	"time"

	"gorm.io/gorm"
)

// User 는 사용자 도메인 모델이다. GORM 모델로도 사용된다.
type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Email     string         `json:"email" gorm:"uniqueIndex;size:255;not null"`
	Password  string         `json:"-" gorm:"size:255;not null"` // JSON 응답에서 제외
	Name      string         `json:"name" gorm:"size:100;not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"` // 소프트 삭제
}

// TableName 은 GORM 테이블명을 지정한다.
func (User) TableName() string {
	return "users"
}
