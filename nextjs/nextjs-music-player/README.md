# Next.js 음악 플레이어

Next.js App Router 기반 음악 플레이어 템플릿.

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
    layout.tsx          - 루트 레이아웃
    page.tsx            - 메인 UI (라이브러리 + 플레이어)
    globals.css         - 글로벌 스타일
  components/
    now-playing.tsx     - 현재 재생 중 표시
    track-list.tsx      - 트랙 목록
    player-bar.tsx      - 하단 플레이어 바
    sidebar-nav.tsx     - 사이드바 네비게이션
  data/
    tracks.ts           - 목 음악 데이터
  lib/
    utils.ts            - cn() 유틸리티
```
