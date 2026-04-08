# Next.js 비디오 플랫폼

Next.js App Router 기반 비디오 스트리밍 플랫폼 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- Lucide React Icons

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
    page.tsx         - 비디오 목록 메인
    watch/page.tsx   - 비디오 재생 페이지
    globals.css      - 글로벌 스타일
  components/
    video-card.tsx   - 비디오 카드 컴포넌트
    video-player.tsx - 비디오 플레이어
    channel-sidebar.tsx - 채널 사이드바
    comment-section.tsx - 댓글 섹션
  data/
    videos.ts        - 목 비디오 데이터
  lib/
    utils.ts         - cn() 유틸리티
```
