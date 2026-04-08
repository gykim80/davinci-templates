# Next.js AI Chat

Next.js App Router 기반 AI 스트리밍 챗봇.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Vercel AI SDK + Anthropic

## 시작하기

```bash
npm install
# .env 파일에 ANTHROPIC_API_KEY 설정
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx       - 루트 레이아웃
    page.tsx         - 채팅 UI (useChat)
    globals.css      - 글로벌 스타일
    api/chat/
      route.ts       - AI 스트리밍 API 엔드포인트
  lib/
    utils.ts         - cn() 유틸리티
```
