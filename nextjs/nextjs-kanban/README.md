# Next.js 칸반 보드

드래그 앤 드롭 기반 칸반 보드. 할 일 / 진행 중 / 완료 컬럼.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- HTML Drag and Drop API
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
    layout.tsx         - 루트 레이아웃
    page.tsx           - 칸반 보드 UI
    globals.css        - 글로벌 스타일
  components/
    kanban-column.tsx  - 칸반 컬럼
    task-card.tsx      - 작업 카드
    add-task-dialog.tsx - 작업 추가 다이얼로그
  lib/
    utils.ts           - cn() 유틸리티
```
