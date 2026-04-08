# Next.js Analytics Dashboard

실시간 데이터 시각화 분석 대시보드.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- 순수 SVG 차트 (외부 라이브러리 없음)
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
    page.tsx         - 대시보드 홈 (메트릭 + 차트)
    globals.css      - 글로벌 스타일
    reports/
      page.tsx       - 리포트 목록
  components/
    line-chart.tsx   - SVG 라인 차트
    bar-chart.tsx    - SVG 바 차트
  lib/
    utils.ts         - cn() 유틸리티
    chart-data.ts    - 시계열 목업 데이터
```
