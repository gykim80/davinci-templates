# Next.js Docs Site

프로젝트 문서 사이트.

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
    page.tsx                - 문서 소개 + 빠른 시작
    globals.css             - 글로벌 스타일
    docs/[...slug]/
      page.tsx              - 문서 페이지 (사이드바 + TOC)
  lib/
    utils.ts                - cn() 유틸리티
    docs.ts                 - 문서 구조 + 콘텐츠
  components/
    doc-sidebar.tsx         - 문서 사이드바
    toc.tsx                 - Table of Contents
```
