# Next.js API Playground

Next.js App Router 기반 API 테스트 도구 템플릿.

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

기본 예시 URL: `https://jsonplaceholder.typicode.com/posts/1`

## 구조

```
src/
  app/
    layout.tsx         - 루트 레이아웃
    page.tsx           - API Playground UI
    globals.css        - 글로벌 스타일
    api/proxy/
      route.ts         - CORS 프록시 API
  lib/
    utils.ts           - cn() 유틸리티
```

## 주요 기능

- HTTP 메서드 선택 (GET/POST/PUT/PATCH/DELETE)
- URL 입력 및 전송
- 요청 헤더 편집 (추가/삭제/토글)
- 요청 본문 편집
- JSON 구문 하이라이팅 응답 뷰어
- 응답 헤더 보기
- 상태 코드, 응답 시간 표시
- 요청 히스토리 (최대 20개, 클릭으로 복원)
- 응답 복사
