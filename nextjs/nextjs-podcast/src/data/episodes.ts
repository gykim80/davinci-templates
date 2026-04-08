// 목 팟캐스트 에피소드 데이터
export interface IEpisode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  durationSec: number;
  publishedAt: string;
  showNotes: string;
  season: number;
  episode: number;
}

export interface IShow {
  name: string;
  host: string;
  cover: string;
  description: string;
  subscribers: string;
  category: string;
}

export const show: IShow = {
  name: "테크 인사이트",
  host: "김개발",
  cover: "https://picsum.photos/seed/podcast-cover/400/400",
  description: "개발자를 위한 기술 트렌드와 인사이트를 전하는 주간 팟캐스트입니다.",
  subscribers: "15.2만",
  category: "기술",
};

export const episodes: IEpisode[] = [
  {
    id: "1", title: "AI 코딩 어시스턴트의 현재와 미래",
    description: "Claude, GPT-4, Copilot 등 AI 코딩 도구들의 현재 수준과 앞으로의 발전 방향을 논의합니다.",
    thumbnail: "https://picsum.photos/seed/ep1/200/200", duration: "42:15", durationSec: 2535,
    publishedAt: "2024-03-28", season: 3, episode: 12,
    showNotes: "## 주요 내용\n- AI 코딩 도구 비교\n- 실제 개발 생산성 변화\n- 앞으로의 발전 방향\n\n## 언급된 도구\n- Claude Code\n- GitHub Copilot\n- Cursor",
  },
  {
    id: "2", title: "Next.js 15의 새로운 기능들",
    description: "Next.js 15에서 추가된 주요 기능과 마이그레이션 가이드를 알아봅니다.",
    thumbnail: "https://picsum.photos/seed/ep2/200/200", duration: "35:42", durationSec: 2142,
    publishedAt: "2024-03-21", season: 3, episode: 11,
    showNotes: "## 주요 내용\n- App Router 개선사항\n- Turbopack 정식 지원\n- Server Actions 변경점",
  },
  {
    id: "3", title: "주니어 개발자를 위한 커리어 조언",
    description: "10년차 시니어 개발자가 전하는 주니어 개발자를 위한 현실적인 커리어 조언.",
    thumbnail: "https://picsum.photos/seed/ep3/200/200", duration: "48:30", durationSec: 2910,
    publishedAt: "2024-03-14", season: 3, episode: 10,
    showNotes: "## 주요 내용\n- 기술 스택 선택 기준\n- 사이드 프로젝트의 중요성\n- 이직 타이밍과 방법",
  },
  {
    id: "4", title: "TypeScript 5.x 심층 분석",
    description: "TypeScript 5.x 버전의 새로운 타입 시스템 기능을 심층 분석합니다.",
    thumbnail: "https://picsum.photos/seed/ep4/200/200", duration: "38:10", durationSec: 2290,
    publishedAt: "2024-03-07", season: 3, episode: 9,
    showNotes: "## 주요 내용\n- Decorator 정식 지원\n- const 타입 파라미터\n- satisfies 연산자 활용법",
  },
  {
    id: "5", title: "DevOps 문화와 플랫폼 엔지니어링",
    description: "모던 DevOps 문화와 떠오르는 플랫폼 엔지니어링에 대해 이야기합니다.",
    thumbnail: "https://picsum.photos/seed/ep5/200/200", duration: "51:05", durationSec: 3065,
    publishedAt: "2024-02-29", season: 3, episode: 8,
    showNotes: "## 주요 내용\n- DevOps vs 플랫폼 엔지니어링\n- IDP(Internal Developer Platform)\n- 자동화 전략",
  },
  {
    id: "6", title: "React Server Components 완전 정복",
    description: "RSC의 동작 원리부터 실제 프로젝트 적용까지 완벽하게 정리합니다.",
    thumbnail: "https://picsum.photos/seed/ep6/200/200", duration: "44:20", durationSec: 2660,
    publishedAt: "2024-02-22", season: 3, episode: 7,
    showNotes: "## 주요 내용\n- RSC 동작 원리\n- 클라이언트/서버 컴포넌트 구분\n- 데이터 페칭 패턴",
  },
];
