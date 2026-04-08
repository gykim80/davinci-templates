# Next.js 팟캐스트

Next.js App Router 기반 팟캐스트 플레이어 템플릿.

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
    page.tsx            - 에피소드 목록
    episode/page.tsx    - 에피소드 상세
    globals.css         - 글로벌 스타일
  components/
    episode-card.tsx    - 에피소드 카드
    audio-player.tsx    - 오디오 플레이어 바
    show-notes.tsx      - 쇼노트
    playlist.tsx        - 재생목록
  data/
    episodes.ts         - 목 에피소드 데이터
  lib/
    utils.ts            - cn() 유틸리티
```
