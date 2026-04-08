# Next.js AI SaaS Platform

AI API 래퍼 + 크레딧 시스템 + 사용량 대시보드 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- 인메모리 크레딧 시스템

## 시작하기

```bash
npm install
# .env 파일에 아래 환경변수 설정
# ANTHROPIC_API_KEY=sk-ant-...
# STRIPE_SECRET_KEY=sk_...
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx               - 루트 레이아웃
    page.tsx                 - 메인 (AI 데모 + 기능 소개)
    globals.css              - 글로벌 스타일
    dashboard/page.tsx       - 사용량 대시보드 + API 키 관리
    playground/page.tsx      - AI API 테스트 플레이그라운드
    api/ai/generate/
      route.ts               - AI 생성 API (크레딧 차감)
  lib/
    utils.ts                 - cn() 유틸리티
    credits.ts               - 인메모리 크레딧 시스템
```
