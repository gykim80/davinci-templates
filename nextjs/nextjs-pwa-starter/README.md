# Next.js PWA Starter

Next.js App Router 기반 PWA 스타터 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- lucide-react 아이콘
- Service Worker (네트워크 우선 캐시 전략)

## 시작하기

```bash
npm install
npm run dev
```

> 참고: 서비스 워커는 프로덕션 빌드에서 완전히 작동합니다.
> `npm run build && npm start`로 PWA 기능을 테스트하세요.

## 구조

```
src/
  app/
    layout.tsx       - 루트 레이아웃 (manifest, viewport)
    page.tsx         - PWA 대시보드
    offline/page.tsx - 오프라인 폴백 페이지
    settings/page.tsx - 설정 페이지
    globals.css      - 글로벌 스타일
  lib/
    use-pwa.ts       - PWA 상태 관리 훅
    utils.ts         - cn() 유틸리티
public/
  manifest.json      - PWA 매니페스트
  sw.js              - 서비스 워커
```

## 주요 기능

- 오프라인 지원 (서비스 워커 + 캐시 전략)
- 앱 설치 프롬프트
- 온라인/오프라인 상태 감지
- 푸시 알림 권한 요청
- PWA 상태 대시보드
- 앱 스타일 하단 네비게이션
- 오프라인 폴백 페이지
- Web App Manifest
