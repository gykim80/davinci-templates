# Next.js Marketplace

Next.js App Router 기반 판매자/구매자 분리 마켓플레이스.

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
    layout.tsx                  - 루트 레이아웃
    page.tsx                    - 인기상품 + 카테고리 + 판매자
    globals.css                 - 글로벌 스타일
    product/[id]/page.tsx       - 상품 상세 (판매자 정보)
    seller/
      dashboard/page.tsx        - 판매자 대시보드
      products/page.tsx         - 상품 관리
  lib/
    utils.ts                    - cn() 유틸리티
    marketplace-data.ts         - 판매자 + 상품 데이터
  components/
    seller-card.tsx             - 판매자 카드 컴포넌트
```
