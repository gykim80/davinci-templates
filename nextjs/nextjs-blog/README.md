# Next.js Blog

MDX 기반 마크다운 블로그 (SSG + 검색).

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
    page.tsx                - 블로그 포스트 목록 + 검색
    globals.css             - 글로벌 스타일
    posts/[slug]/
      page.tsx              - 포스트 상세 (마크다운 렌더링)
    tags/[tag]/
      page.tsx              - 태그별 필터
  lib/
    utils.ts                - cn() 유틸리티
    posts.ts                - 블로그 포스트 데이터
    markdown.ts             - 마크다운→HTML 변환
  components/
    post-card.tsx           - 포스트 카드
```
