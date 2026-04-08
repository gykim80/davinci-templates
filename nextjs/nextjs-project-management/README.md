# Next.js Project Management

칸반 보드 + 타임라인 + 팀 협업 프로젝트 관리.

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
    page.tsx         - 프로젝트 목록
    globals.css      - 글로벌 스타일
    board/
      page.tsx       - 칸반 보드
    timeline/
      page.tsx       - 간트 차트 타임라인
  components/
    task-card.tsx    - 태스크 카드 컴포넌트
  lib/
    utils.ts         - cn() 유틸리티
    project-data.ts  - 목업 프로젝트/태스크 데이터
```
