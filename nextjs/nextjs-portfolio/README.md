# Next.js Portfolio

개발자/디자이너 포트폴리오.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 시작하기

```bash
npm install
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx              - 루트 레이아웃
    page.tsx                - 히어로 + 프로젝트 갤러리 + 스킬 + 연락처
    globals.css             - 글로벌 스타일
    projects/[id]/
      page.tsx              - 프로젝트 상세
  lib/
    utils.ts                - cn() 유틸리티
    portfolio-data.ts       - 프로필 + 프로젝트 + 스킬
  components/
    project-card.tsx        - 프로젝트 카드
    skill-badge.tsx         - 스킬 뱃지
```
