# Next.js 노트 앱

마크다운 기반 노트 앱. 사이드바, 검색, 태그 기능 포함.

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
    layout.tsx       - 루트 레이아웃
    page.tsx         - 메인 노트 UI
    globals.css      - 글로벌 스타일
  components/
    note-sidebar.tsx - 노트 목록 사이드바
    note-editor.tsx  - 마크다운 에디터
  lib/
    utils.ts         - cn() 유틸리티
```
