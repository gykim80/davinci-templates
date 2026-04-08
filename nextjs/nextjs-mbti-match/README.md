# MBTI 궁합 매칭

나와 상대방의 MBTI를 선택하면 궁합을 분석해주는 앱.

## 기술 스택

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS

## 기능

- MBTI 16유형 선택
- 궁합 분석 (5단계 등급)
- 16유형 성격 설명
- 관계 개선 꿀팁

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
    page.tsx             - MBTI 선택/결과 UI
    globals.css          - 글로벌 스타일
  lib/
    mbti.ts              - 16유형 프로필 데이터
    compatibility.ts     - 궁합 분석 로직
    utils.ts             - cn() 유틸리티
```
