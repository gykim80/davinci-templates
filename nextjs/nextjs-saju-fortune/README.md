# 사주포춘 - AI 사주팔자 운세

생년월일시를 입력하면 사주팔자와 오행 분석, 오늘의 운세를 확인할 수 있는 앱.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 기능

- 생년월일시 입력으로 사주팔자 계산
- 천간지지 기반 오행 분석
- 행운의 숫자 생성
- 오늘의 운세
- 결과 공유 기능

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
    page.tsx         - 사주 입력/결과 UI
    globals.css      - 글로벌 스타일
  lib/
    saju.ts          - 사주팔자 계산 로직
    utils.ts         - cn() 유틸리티
```
