// 목 음악 트랙 데이터
export interface ITrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: string;
  durationSec: number;
}

export interface IPlaylist {
  id: string;
  name: string;
  cover: string;
  trackCount: number;
}

export const playlists: IPlaylist[] = [
  { id: "p1", name: "내가 좋아하는 노래", cover: "https://picsum.photos/seed/pl1/200/200", trackCount: 24 },
  { id: "p2", name: "집중 모드", cover: "https://picsum.photos/seed/pl2/200/200", trackCount: 15 },
  { id: "p3", name: "운동할 때", cover: "https://picsum.photos/seed/pl3/200/200", trackCount: 30 },
  { id: "p4", name: "드라이브", cover: "https://picsum.photos/seed/pl4/200/200", trackCount: 18 },
];

export const tracks: ITrack[] = [
  { id: "t1", title: "여름밤의 꿈", artist: "블루밴드", album: "여름 이야기", albumArt: "https://picsum.photos/seed/album1/300/300", duration: "3:45", durationSec: 225 },
  { id: "t2", title: "도시의 불빛", artist: "네온사인", album: "미드나잇", albumArt: "https://picsum.photos/seed/album2/300/300", duration: "4:12", durationSec: 252 },
  { id: "t3", title: "바다로 가자", artist: "웨이브", album: "서핑 타임", albumArt: "https://picsum.photos/seed/album3/300/300", duration: "3:28", durationSec: 208 },
  { id: "t4", title: "커피 한 잔", artist: "카페라떼", album: "아침 루틴", albumArt: "https://picsum.photos/seed/album4/300/300", duration: "3:55", durationSec: 235 },
  { id: "t5", title: "별이 빛나는 밤에", artist: "스타더스트", album: "우주 여행", albumArt: "https://picsum.photos/seed/album5/300/300", duration: "5:10", durationSec: 310 },
  { id: "t6", title: "봄바람", artist: "체리블로썸", album: "사계절", albumArt: "https://picsum.photos/seed/album6/300/300", duration: "3:32", durationSec: 212 },
  { id: "t7", title: "비 오는 날", artist: "레인드롭", album: "감성 모음", albumArt: "https://picsum.photos/seed/album7/300/300", duration: "4:05", durationSec: 245 },
  { id: "t8", title: "해질녘", artist: "선셋", album: "노을빛", albumArt: "https://picsum.photos/seed/album8/300/300", duration: "3:48", durationSec: 228 },
  { id: "t9", title: "달빛 소나타", artist: "문라이트", album: "클래식 리메이크", albumArt: "https://picsum.photos/seed/album9/300/300", duration: "4:30", durationSec: 270 },
  { id: "t10", title: "산책길", artist: "가을바람", album: "힐링", albumArt: "https://picsum.photos/seed/album10/300/300", duration: "3:20", durationSec: 200 },
];
