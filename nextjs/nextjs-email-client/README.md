# Next.js Email Client

Next.js App Router 기반 이메일 클라이언트 템플릿.

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
    page.tsx         - 이메일 클라이언트 UI
    globals.css      - 글로벌 스타일
  data/
    emails.ts        - 모의 이메일 데이터
  lib/
    utils.ts         - cn() 유틸리티
```

## 주요 기능

- 폴더별 이메일 목록 (받은편지함, 보낸편지함 등)
- 이메일 상세 보기
- 읽음/읽지않음 상태 관리
- 별표(스타) 토글
- 이메일 검색
- 새 메일 작성 모달
- 반응형 3-패널 레이아웃
