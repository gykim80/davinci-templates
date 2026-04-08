# 지하철 실시간 도착 정보

서울 지하철 1~9호선 실시간 열차 도착 정보를 확인할 수 있는 앱.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 기능

- 역 이름 검색
- 1~9호선 노선 선택
- 노선별 역 목록 표시
- 상행/하행 도착 정보 (목업 데이터)
- 30초 자동 갱신
- 자주 검색하는 역 바로가기

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
    page.tsx         - 역 검색/도착 정보 UI
    globals.css      - 글로벌 스타일
  lib/
    subway.ts        - 노선/역/도착 정보 데이터
    utils.ts         - cn() 유틸리티
```
