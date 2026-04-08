# Next.js URL 단축기

URL 단축 서비스. 단축 링크 생성, 클릭 통계, 복사 기능.

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
    page.tsx            - 메인 URL 단축 UI
    globals.css         - 글로벌 스타일
  components/
    url-form.tsx        - URL 입력 폼
    url-list.tsx        - 단축 링크 목록
    url-stats.tsx       - 클릭 통계
  lib/
    utils.ts            - cn() 유틸리티
```
