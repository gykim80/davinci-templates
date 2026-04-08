# Next.js Auction

Next.js App Router 기반 실시간 경매 플랫폼.

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
    page.tsx                 - 경매 그리드 + 카운트다운
    globals.css              - 글로벌 스타일
    auction/[id]/page.tsx    - 경매 상세 + 입찰
    my-bids/page.tsx         - 내 입찰 내역
    api/bid/route.ts         - 입찰 API
  lib/
    utils.ts                 - cn() 유틸리티
    auction-data.ts          - 경매 아이템 데이터
  components/
    countdown.tsx            - 카운트다운 타이머
    bid-history.tsx          - 입찰 내역 컴포넌트
```
