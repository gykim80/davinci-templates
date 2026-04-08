# 이력서 빌더 - 한국형 이력서/자기소개서

한국 표준 이력서 양식에 맞는 이력서와 자기소개서를 작성하고 PDF로 저장할 수 있는 앱.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 기능

- 인적사항/학력/경력/자격증/기술스택/자기소개서 입력
- 한국 표준 이력서 양식 미리보기
- PDF 저장 (브라우저 인쇄 기능)
- 샘플 데이터 불러오기

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
    page.tsx         - 이력서 빌더 UI
    globals.css      - 글로벌 스타일 (인쇄용 포함)
  lib/
    types.ts         - 이력서 데이터 타입 및 샘플
    utils.ts         - cn() 유틸리티
```
