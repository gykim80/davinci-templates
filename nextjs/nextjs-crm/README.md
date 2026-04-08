# Next.js CRM

고객 관계 관리 + 파이프라인 + 연락처.

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
    layout.tsx        - 루트 레이아웃
    page.tsx          - 파이프라인 보드 (칸반)
    globals.css       - 글로벌 스타일
    contacts/
      page.tsx        - 연락처 리스트
    deals/[id]/
      page.tsx        - 딜 상세 정보
  components/
    pipeline-board.tsx - 칸반 보드 컴포넌트
  lib/
    utils.ts          - cn() 유틸리티
    crm-data.ts       - 목업 딜/연락처 데이터
```
