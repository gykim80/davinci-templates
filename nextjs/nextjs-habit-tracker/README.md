# Next.js 습관 추적기

GitHub 스타일 그리드로 습관을 추적하는 앱. 일일 체크인, 연속 기록, 통계.

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
    layout.tsx          - 루트 레이아웃
    page.tsx            - 메인 습관 추적 UI
    globals.css         - 글로벌 스타일
  components/
    habit-grid.tsx      - GitHub 스타일 활동 그리드
    habit-stats.tsx     - 통계 카드
    add-habit-dialog.tsx - 습관 추가 다이얼로그
  lib/
    utils.ts            - cn() 유틸리티
```
