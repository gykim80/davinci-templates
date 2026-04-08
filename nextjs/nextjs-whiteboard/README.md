# Next.js 화이트보드

Next.js App Router 기반 화이트보드 드로잉 애플리케이션 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- HTML5 Canvas API
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
    layout.tsx           - 루트 레이아웃
    page.tsx             - 화이트보드 메인
    globals.css          - 글로벌 스타일
  components/
    canvas-board.tsx     - 캔버스 드로잉 영역
    tool-palette.tsx     - 도구 팔레트
    color-picker.tsx     - 색상 선택기
    stroke-width.tsx     - 선 굵기 조절
  lib/
    utils.ts             - cn() 유틸리티
```

## 기능

- 펜 / 지우개 / 사각형 / 원 / 직선 그리기
- 색상 선택 (8색 + 커스텀)
- 선 굵기 조절 (1~20px)
- 실행 취소 / 전체 지우기
- 이미지 다운로드 (PNG)
