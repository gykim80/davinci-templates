# Next.js 인보이스

인보이스(청구서) 생성 및 관리 시스템. 라인 아이템, 미리보기, 목록 관리.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- lucide-react 아이콘

## 시작하기

```bash
npm install
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx             - 루트 레이아웃
    page.tsx               - 인보이스 목록 + 생성 UI
    globals.css            - 글로벌 스타일
  components/
    invoice-form.tsx       - 인보이스 작성 폼
    invoice-preview.tsx    - 인보이스 미리보기
    invoice-list.tsx       - 인보이스 목록
  lib/
    utils.ts               - cn() 유틸리티
```
