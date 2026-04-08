# Next.js 이미지 갤러리

Next.js App Router 기반 이미지 갤러리 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Lucide React Icons

## 시작하기

```bash
npm install
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx       - 루트 레이아웃
    page.tsx         - 갤러리 메인 (그리드 + 필터)
    globals.css      - 글로벌 스타일
  components/
    gallery-grid.tsx - 메이슨리 스타일 그리드
    lightbox.tsx     - 이미지 라이트박스 모달
    category-filter.tsx - 카테고리 필터
  data/
    images.ts        - 목 이미지 데이터
  lib/
    utils.ts         - cn() 유틸리티
```
