# Next.js SaaS Starter

Stripe 구독 결제 + 인증 + 대시보드가 포함된 풀스택 SaaS 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Stripe 결제

## 시작하기

```bash
npm install
# .env 파일에 아래 환경변수 설정
# STRIPE_SECRET_KEY=sk_...
# STRIPE_WEBHOOK_SECRET=whsec_...
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx              - 루트 레이아웃
    page.tsx                - 랜딩 페이지
    globals.css             - 글로벌 스타일
    dashboard/page.tsx      - 대시보드
    pricing/page.tsx        - 요금제 페이지
    api/stripe/webhook/
      route.ts              - Stripe 웹훅 핸들러
  lib/
    utils.ts                - cn() 유틸리티
    stripe.ts               - Stripe 설정 및 플랜 정의
```
