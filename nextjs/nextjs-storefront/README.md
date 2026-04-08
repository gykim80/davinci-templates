# Next.js Storefront

Next.js App Router 기반 고성능 이커머스 상점.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- lucide-react

## 시작하기

```bash
npm install
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx               - 루트 레이아웃
    page.tsx                 - 히어로 + 카테고리 + 인기상품
    globals.css              - 글로벌 스타일
    products/
      page.tsx               - 상품 목록 + 필터
      [id]/page.tsx          - 상품 상세
    cart/
      page.tsx               - 장바구니
  lib/
    utils.ts                 - cn() 유틸리티
    products.ts              - 상품 데이터 + 필터링
    cart.ts                  - 장바구니 유틸리티
  components/
    product-card.tsx         - 상품 카드 컴포넌트
```
