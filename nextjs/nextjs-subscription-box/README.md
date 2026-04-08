# Next.js Subscription Box

큐레이션 구독 박스 커머스 템플릿. 상품 카드, 구독 플랜, 결제 폼 포함.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Stripe 결제 (목업)

## 시작하기

```bash
npm install
# .env 파일에 아래 환경변수 설정
# STRIPE_SECRET_KEY=sk_...
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx               - 루트 레이아웃
    page.tsx                 - 메인 (박스 목록 + 구독 플랜)
    globals.css              - 글로벌 스타일
    box/[id]/page.tsx        - 구독 박스 상세
    checkout/page.tsx        - 결제 폼
    api/subscribe/
      route.ts               - 구독 생성 API
  lib/
    utils.ts                 - cn() 유틸리티
    products.ts              - 상품 및 박스 데이터
```
