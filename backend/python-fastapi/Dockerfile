FROM python:3.11-slim

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY pyproject.toml .
RUN pip install --no-cache-dir uv && uv pip install --system -e .

# 소스 코드 복사
COPY src/ ./src/

# 비루트 사용자 설정
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
