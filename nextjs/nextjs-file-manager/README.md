# Next.js File Manager

Next.js App Router 기반 파일 매니저 템플릿.

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
    page.tsx         - 파일 매니저 UI
    globals.css      - 글로벌 스타일
  data/
    filesystem.ts    - 모의 파일시스템 데이터
  lib/
    utils.ts         - cn() 유틸리티
```

## 주요 기능

- 폴더 탐색 (더블클릭으로 진입)
- 그리드 / 리스트 뷰 토글
- 브레드크럼 네비게이션
- 파일 이름 변경
- 파일/폴더 삭제
- 파일 종류별 아이콘
- 상태바 (항목 수 표시)
