# Next.js Monitoring

서버 상태 + API 헬스체크 + 알림 모니터링.

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
    layout.tsx          - 루트 레이아웃
    page.tsx            - 모니터링 홈 (서비스 상태 + 인시던트)
    globals.css         - 글로벌 스타일
    incidents/
      page.tsx          - 인시던트 타임라인
    services/[id]/
      page.tsx          - 서비스 상세 (응답시간 차트)
    api/health/
      route.ts          - 헬스체크 API
  components/
    status-badge.tsx    - 상태 뱃지 컴포넌트
  lib/
    utils.ts            - cn() 유틸리티
    monitor-data.ts     - 목업 서비스 상태 데이터
```
