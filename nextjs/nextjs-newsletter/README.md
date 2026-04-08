# Next.js Newsletter

뉴스레터 발행 + 구독자 관리.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 시작하기

```bash
npm install
# .env 파일에 RESEND_API_KEY 설정 (선택)
npm run dev
```

## 구조

```
src/
  app/
    layout.tsx              - 루트 레이아웃
    page.tsx                - 최신 뉴스레터 미리보기 + 구독 폼
    globals.css             - 글로벌 스타일
    archive/
      page.tsx              - 뉴스레터 아카이브
      [id]/page.tsx         - 뉴스레터 상세
    subscribe/
      page.tsx              - 구독 확인
    api/subscribe/
      route.ts              - 구독 API
  lib/
    utils.ts                - cn() 유틸리티
    newsletter-data.ts      - 뉴스레터 목업 데이터
    subscribers.ts          - 인메모리 구독자 관리
```
