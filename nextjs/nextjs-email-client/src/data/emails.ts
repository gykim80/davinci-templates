export interface IEmail {
  id: string;
  from: { name: string; email: string };
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  folder: "inbox" | "sent" | "drafts" | "trash" | "spam";
  labels?: string[];
}

// 모의 이메일 데이터
export const MOCK_EMAILS: IEmail[] = [
  {
    id: "1",
    from: { name: "김철수", email: "chulsoo@example.com" },
    to: "me@example.com",
    subject: "프로젝트 회의 일정 변경 안내",
    preview: "안녕하세요, 이번 주 금요일 회의가 월요일로...",
    body: "안녕하세요,\n\n이번 주 금요일로 예정되어 있던 프로젝트 회의가 다음 주 월요일 오후 2시로 변경되었습니다.\n\n장소는 기존과 동일하게 3층 회의실입니다.\n\n참석 가능 여부를 회신해 주시면 감사하겠습니다.\n\n감사합니다.\n김철수 드림",
    date: "2026-03-31T09:30:00",
    read: false,
    starred: true,
    folder: "inbox",
    labels: ["업무"],
  },
  {
    id: "2",
    from: { name: "이영희", email: "younghee@example.com" },
    to: "me@example.com",
    subject: "디자인 리뷰 요청",
    preview: "새로운 랜딩 페이지 디자인을 확인해...",
    body: "안녕하세요,\n\n새로운 랜딩 페이지 디자인을 확인해 주시겠어요?\n\n피그마 링크: https://figma.com/example\n\n금주 내로 피드백 부탁드립니다.\n\n감사합니다.\n이영희",
    date: "2026-03-31T08:15:00",
    read: false,
    starred: false,
    folder: "inbox",
    labels: ["디자인"],
  },
  {
    id: "3",
    from: { name: "박민수", email: "minsoo@example.com" },
    to: "me@example.com",
    subject: "점심 같이 하실래요?",
    preview: "오늘 점심 시간에 새로 생긴 식당...",
    body: "오늘 점심 시간에 새로 생긴 식당에 가볼까요?\n12시 30분에 로비에서 만나요!",
    date: "2026-03-30T11:00:00",
    read: true,
    starred: false,
    folder: "inbox",
  },
  {
    id: "4",
    from: { name: "시스템 알림", email: "noreply@system.com" },
    to: "me@example.com",
    subject: "보안 알림: 새 기기에서 로그인",
    preview: "새로운 기기에서 로그인이 감지되었습니다...",
    body: "새로운 기기에서 로그인이 감지되었습니다.\n\n기기: MacBook Pro\n위치: 서울, 대한민국\n시간: 2026-03-30 14:22\n\n본인이 아닌 경우, 즉시 비밀번호를 변경해 주세요.",
    date: "2026-03-30T14:22:00",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["보안"],
  },
  {
    id: "5",
    from: { name: "정수진", email: "sujin@example.com" },
    to: "me@example.com",
    subject: "API 문서 업데이트 완료",
    preview: "요청하신 API 문서 업데이트가 완료...",
    body: "안녕하세요,\n\n요청하신 API 문서 업데이트가 완료되었습니다.\n\n변경 사항:\n- POST /users 엔드포인트 추가\n- 에러 코드 목록 갱신\n- 인증 섹션 보강\n\n확인 후 승인 부탁드립니다.",
    date: "2026-03-29T16:45:00",
    read: true,
    starred: true,
    folder: "inbox",
    labels: ["개발"],
  },
  {
    id: "6",
    from: { name: "나", email: "me@example.com" },
    to: "team@example.com",
    subject: "주간 보고서 공유",
    preview: "이번 주 진행 상황을 공유합니다...",
    body: "팀원 여러분,\n\n이번 주 진행 상황을 공유합니다.\n\n1. 프론트엔드: 대시보드 UI 완성\n2. 백엔드: API v2 마이그레이션 진행 중\n3. QA: 통합 테스트 70% 완료\n\n다음 주 계획도 첨부하였으니 확인 바랍니다.",
    date: "2026-03-28T17:00:00",
    read: true,
    starred: false,
    folder: "sent",
  },
  {
    id: "7",
    from: { name: "나", email: "me@example.com" },
    to: "chulsoo@example.com",
    subject: "Re: 프로젝트 일정",
    preview: "네, 확인했습니다. 월요일에 뵙겠습니다.",
    body: "네, 확인했습니다. 월요일 오후 2시에 뵙겠습니다.\n\n감사합니다.",
    date: "2026-03-28T10:00:00",
    read: true,
    starred: false,
    folder: "sent",
  },
  {
    id: "8",
    from: { name: "스팸봇", email: "spam@fake.com" },
    to: "me@example.com",
    subject: "축하합니다! 당첨되셨습니다!",
    preview: "무료 상품이 기다리고 있습니다...",
    body: "이 메일은 스팸입니다.",
    date: "2026-03-27T03:00:00",
    read: false,
    starred: false,
    folder: "spam",
  },
];

export type FolderType = "inbox" | "sent" | "drafts" | "trash" | "spam";

export const FOLDERS: { key: FolderType; label: string }[] = [
  { key: "inbox", label: "받은편지함" },
  { key: "sent", label: "보낸편지함" },
  { key: "drafts", label: "임시보관함" },
  { key: "trash", label: "휴지통" },
  { key: "spam", label: "스팸" },
];
