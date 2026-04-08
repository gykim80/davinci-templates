// 목 비디오 데이터
export interface IVideo {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  duration: string;
  category: string;
  description: string;
}

export interface IComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
}

export const videoCategories = ["전체", "음악", "게임", "교육", "요리", "여행", "기술"] as const;
export type VideoCategory = (typeof videoCategories)[number];

export const channels = [
  { name: "테크 크리에이터", avatar: "https://picsum.photos/seed/ch1/40/40", subscribers: "120만" },
  { name: "요리의 정석", avatar: "https://picsum.photos/seed/ch2/40/40", subscribers: "85만" },
  { name: "여행일지", avatar: "https://picsum.photos/seed/ch3/40/40", subscribers: "52만" },
  { name: "게임채널", avatar: "https://picsum.photos/seed/ch4/40/40", subscribers: "200만" },
  { name: "음악감상실", avatar: "https://picsum.photos/seed/ch5/40/40", subscribers: "38만" },
];

export const videos: IVideo[] = [
  { id: "1", title: "Next.js 15 완벽 가이드", thumbnail: "https://picsum.photos/seed/vid1/640/360", channel: "테크 크리에이터", channelAvatar: "https://picsum.photos/seed/ch1/40/40", views: "12만", uploadedAt: "3일 전", duration: "24:30", category: "기술", description: "Next.js 15의 새로운 기능을 알아봅니다." },
  { id: "2", title: "집에서 만드는 파스타", thumbnail: "https://picsum.photos/seed/vid2/640/360", channel: "요리의 정석", channelAvatar: "https://picsum.photos/seed/ch2/40/40", views: "8.5만", uploadedAt: "1주 전", duration: "15:45", category: "요리", description: "간단하게 만드는 크림 파스타 레시피." },
  { id: "3", title: "제주도 3박 4일 여행기", thumbnail: "https://picsum.photos/seed/vid3/640/360", channel: "여행일지", channelAvatar: "https://picsum.photos/seed/ch3/40/40", views: "25만", uploadedAt: "2주 전", duration: "32:10", category: "여행", description: "제주도의 숨은 명소를 소개합니다." },
  { id: "4", title: "신작 RPG 첫 플레이", thumbnail: "https://picsum.photos/seed/vid4/640/360", channel: "게임채널", channelAvatar: "https://picsum.photos/seed/ch4/40/40", views: "45만", uploadedAt: "5일 전", duration: "1:02:30", category: "게임", description: "올해 최고의 RPG 게임 첫인상 리뷰." },
  { id: "5", title: "재즈 피아노 연주", thumbnail: "https://picsum.photos/seed/vid5/640/360", channel: "음악감상실", channelAvatar: "https://picsum.photos/seed/ch5/40/40", views: "3.2만", uploadedAt: "1일 전", duration: "18:20", category: "음악", description: "편안한 재즈 피아노 라이브 연주입니다." },
  { id: "6", title: "TypeScript 타입 시스템 심화", thumbnail: "https://picsum.photos/seed/vid6/640/360", channel: "테크 크리에이터", channelAvatar: "https://picsum.photos/seed/ch1/40/40", views: "7.8만", uploadedAt: "4일 전", duration: "28:15", category: "기술", description: "제네릭, 조건부 타입, 유틸리티 타입을 깊이 있게 다룹니다." },
  { id: "7", title: "한우 스테이크 굽는 법", thumbnail: "https://picsum.photos/seed/vid7/640/360", channel: "요리의 정석", channelAvatar: "https://picsum.photos/seed/ch2/40/40", views: "15만", uploadedAt: "6일 전", duration: "12:50", category: "요리", description: "완벽한 미디엄 레어 스테이크를 만들어봅니다." },
  { id: "8", title: "도쿄 3일 자유여행", thumbnail: "https://picsum.photos/seed/vid8/640/360", channel: "여행일지", channelAvatar: "https://picsum.photos/seed/ch3/40/40", views: "32만", uploadedAt: "3주 전", duration: "45:00", category: "여행", description: "도쿄의 맛집과 볼거리를 총정리." },
];

export const mockComments: IComment[] = [
  { id: "c1", author: "코딩마스터", avatar: "https://picsum.photos/seed/user1/32/32", text: "정말 유익한 영상이네요! 감사합니다 🙏", date: "2시간 전", likes: 42 },
  { id: "c2", author: "초보개발자", avatar: "https://picsum.photos/seed/user2/32/32", text: "이런 내용 찾고 있었는데 딱이에요!", date: "5시간 전", likes: 18 },
  { id: "c3", author: "디자이너Kim", avatar: "https://picsum.photos/seed/user3/32/32", text: "UI도 예쁘고 설명도 깔끔해요", date: "1일 전", likes: 7 },
  { id: "c4", author: "열공중", avatar: "https://picsum.photos/seed/user4/32/32", text: "다음 영상도 기대됩니다!", date: "2일 전", likes: 25 },
];
