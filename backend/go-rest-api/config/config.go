package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

// Config 는 애플리케이션 설정을 담는 구조체이다.
type Config struct {
	// 서버 설정
	AppPort string `env:"APP_PORT" envDefault:"8080"`

	// 데이터베이스 설정
	DBHost     string `env:"DB_HOST" envDefault:"localhost"`
	DBPort     string `env:"DB_PORT" envDefault:"5432"`
	DBName     string `env:"DB_NAME" envDefault:"app_db"`
	DBUser     string `env:"DB_USER" envDefault:"postgres"`
	DBPassword string `env:"DB_PASSWORD" envDefault:"password"`
	DBSSLMode  string `env:"DB_SSLMODE" envDefault:"disable"`

	// JWT 설정
	JWTSecret     string `env:"JWT_SECRET" envDefault:"dev-secret-key"`
	JWTExpireHour int    `env:"JWT_EXPIRE_HOUR" envDefault:"24"`

	// 로그 설정
	LogLevel string `env:"LOG_LEVEL" envDefault:"info"`
}

// Load 는 환경 변수에서 설정을 읽어 Config를 반환한다.
func Load() (*Config, error) {
	cfg := &Config{}
	if err := env.Parse(cfg); err != nil {
		return nil, fmt.Errorf("설정 파싱 실패: %w", err)
	}
	return cfg, nil
}

// DSN 은 PostgreSQL 연결 문자열을 반환한다.
func (c *Config) DSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		c.DBHost, c.DBPort, c.DBUser, c.DBPassword, c.DBName, c.DBSSLMode,
	)
}
