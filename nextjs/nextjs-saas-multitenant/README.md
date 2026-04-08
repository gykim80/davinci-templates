# Next.js SaaS Multi-Tenant

서브도메인 기반 멀티테넌트 SaaS 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Middleware 서브도메인 라우팅

## 시작하기

```bash
npm install
npm run dev
# 개발 시: http://localhost:3000?tenant=acme 로 테넌트 확인
```

## 구조

```
src/
  middleware.ts              - 서브도메인 감지 미들웨어
  app/
    layout.tsx               - 루트 레이아웃
    page.tsx                 - 메인 페이지 (테넌트 목록)
    globals.css              - 글로벌 스타일
    [tenant]/
      page.tsx               - 테넌트별 대시보드
      settings/page.tsx      - 테넌트 설정
  lib/
    utils.ts                 - cn() 유틸리티
    tenant.ts                - 테넌트 해석 유틸리티
```
