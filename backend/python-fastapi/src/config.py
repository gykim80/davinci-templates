from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # 앱 기본 설정
    app_name: str = "FastAPI Template"
    app_version: str = "0.1.0"
    debug: bool = False

    # 서버 설정
    host: str = "0.0.0.0"
    port: int = 8000

    # 데이터베이스 설정
    database_url: str = "sqlite:///./app.db"

    # CORS 설정
    allowed_origins: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


# 전역 설정 인스턴스
settings = Settings()
