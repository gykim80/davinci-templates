// 목 이미지 데이터
export interface IImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  photographer: string;
  date: string;
}

// picsum.photos를 사용한 더미 이미지
export const categories = ["전체", "자연", "도시", "인물", "음식", "동물"] as const;

export type Category = (typeof categories)[number];

export const images: IImage[] = [
  { id: "1", src: "https://picsum.photos/seed/nature1/600/400", alt: "산과 호수", category: "자연", width: 600, height: 400, photographer: "김민수", date: "2024-03-15" },
  { id: "2", src: "https://picsum.photos/seed/city1/400/600", alt: "도시 야경", category: "도시", width: 400, height: 600, photographer: "이서연", date: "2024-03-10" },
  { id: "3", src: "https://picsum.photos/seed/portrait1/500/500", alt: "포트레이트", category: "인물", width: 500, height: 500, photographer: "박지훈", date: "2024-03-08" },
  { id: "4", src: "https://picsum.photos/seed/food1/600/450", alt: "한식 테이블", category: "음식", width: 600, height: 450, photographer: "최유나", date: "2024-03-05" },
  { id: "5", src: "https://picsum.photos/seed/animal1/500/400", alt: "고양이", category: "동물", width: 500, height: 400, photographer: "정도현", date: "2024-02-28" },
  { id: "6", src: "https://picsum.photos/seed/nature2/600/800", alt: "숲속 길", category: "자연", width: 600, height: 800, photographer: "김민수", date: "2024-02-25" },
  { id: "7", src: "https://picsum.photos/seed/city2/600/400", alt: "서울 스카이라인", category: "도시", width: 600, height: 400, photographer: "이서연", date: "2024-02-20" },
  { id: "8", src: "https://picsum.photos/seed/food2/450/600", alt: "디저트 플레이팅", category: "음식", width: 450, height: 600, photographer: "최유나", date: "2024-02-15" },
  { id: "9", src: "https://picsum.photos/seed/animal2/600/500", alt: "강아지", category: "동물", width: 600, height: 500, photographer: "정도현", date: "2024-02-10" },
  { id: "10", src: "https://picsum.photos/seed/nature3/500/700", alt: "바다 일몰", category: "자연", width: 500, height: 700, photographer: "김민수", date: "2024-02-05" },
  { id: "11", src: "https://picsum.photos/seed/city3/700/400", alt: "브릿지 야경", category: "도시", width: 700, height: 400, photographer: "이서연", date: "2024-01-30" },
  { id: "12", src: "https://picsum.photos/seed/portrait2/400/500", alt: "흑백 인물", category: "인물", width: 400, height: 500, photographer: "박지훈", date: "2024-01-25" },
];
