# Next.js Wiki

팀/커뮤니티 위키.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- 자체 마크다운 파서 (외부 라이브러리 없음)

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
    page.tsx                - 최근 편집 + 인기 페이지 + 검색
    globals.css             - 글로벌 스타일
    wiki/[...slug]/
      page.tsx              - 위키 페이지 (마크다운 렌더링)
    wiki/edit/[...slug]/
      page.tsx              - 위키 편집
  lib/
    utils.ts                - cn() 유틸리티
    wiki-data.ts            - 위키 페이지 + 편집 이력
  components/
    wiki-sidebar.tsx        - 위키 네비게이션 트리
```
