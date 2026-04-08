# 부동산매물 - 매물 검색 플랫폼

지역별 부동산 매물 검색 및 등록 서비스.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 기능

- 매물 리스트 그리드 뷰
- 지역/유형/거래 필터링
- 매물 상세 모달 (지도 플레이스홀더 포함)
- 매물 등록 폼

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
    page.tsx         - 매물 검색/필터 UI
    globals.css      - 글로벌 스타일
  lib/
    data.ts          - 매물 목업 데이터
    utils.ts         - cn() 유틸리티
```
