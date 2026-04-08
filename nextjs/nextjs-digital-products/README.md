# Next.js Digital Products

Next.js App Router 기반 디지털 상품 판매 플랫폼.

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
    page.tsx                    - 디지털 상품 그리드 + 검색
    globals.css                 - 글로벌 스타일
    product/[id]/page.tsx       - 상품 상세 + 미리보기 + 구매
    library/page.tsx            - 구매 라이브러리 + 다운로드
    api/download/[id]/route.ts  - 다운로드 API
  lib/
    utils.ts                    - cn() 유틸리티
    digital-products.ts         - 디지털 상품 데이터
    license.ts                  - 라이선스 키 유틸리티
```
