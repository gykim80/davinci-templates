# Next.js Admin Dashboard

shadcn/ui 기반 풀스택 어드민 대시보드.

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
    page.tsx         - 대시보드 홈 (통계 카드 + 최근 활동)
    globals.css      - 글로벌 스타일
    users/
      page.tsx       - 사용자 관리 테이블
    settings/
      page.tsx       - 설정 폼
  components/
    sidebar.tsx      - 사이드바 내비게이션
    stats-card.tsx   - 통계 카드 컴포넌트
  lib/
    utils.ts         - cn() 유틸리티
    mock-data.ts     - 목업 데이터
```
