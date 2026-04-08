# Next.js Landing Page

SaaS 랜딩 페이지 + 웨이트리스트 + 뉴스레터 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 시작하기

```bash
npm install
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx           - 루트 레이아웃
    page.tsx             - 랜딩 페이지 (히어로 + 기능 + 후기 + FAQ)
    globals.css          - 글로벌 스타일
    api/waitlist/
      route.ts           - 이메일 웨이트리스트 API
  lib/
    utils.ts             - cn() 유틸리티
    waitlist.ts          - 인메모리 이메일 저장
```
