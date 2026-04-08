# Next.js Auth Starter

Next.js App Router 기반 인증 스타터 템플릿.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS
- 모의 JWT 인증 (jose 패턴)

## 시작하기

```bash
npm install
npm run dev
```

데모 계정: `demo@example.com` / `password123`

## 구조

```
src/
  app/
    layout.tsx       - 루트 레이아웃 (AuthProvider)
    page.tsx         - 인증 상태별 리다이렉트
    login/page.tsx   - 로그인 폼
    register/page.tsx - 회원가입 폼
    dashboard/page.tsx - 보호된 대시보드
    globals.css      - 글로벌 스타일
  components/
    auth-provider.tsx - 인증 Context + Provider
  lib/
    auth.ts          - 모의 JWT 로직
    utils.ts         - cn() 유틸리티
```

## 주요 기능

- 로그인 / 회원가입 폼
- JWT 토큰 생성 및 파싱 (데모)
- 보호된 라우트 패턴 (리다이렉트)
- 세션 유지 (localStorage)
- 토큰 페이로드 시각화
