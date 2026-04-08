"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check,
  Star,
  Filter,
  Grid3X3,
  List,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* 이벤트 타입 */
interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  emoji: string;
  attendees: number;
  maxAttendees: number;
  price: string;
  host: string;
  tags: string[];
  rsvpd: boolean;
}

/* 샘플 이벤트 데이터 */
const EVENTS: IEvent[] = [
  {
    id: "1", title: "프론트엔드 개발자 밋업", description: "React, Vue, Svelte 등 프론트엔드 기술에 대해 이야기하는 밋업입니다.\n\n이번 세션에서는 서버 컴포넌트와 SSR의 미래에 대해 다룹니다.\n\n네트워킹 시간도 있으니 부담 없이 참여해주세요!",
    date: "2026-04-05", time: "14:00 - 17:00", location: "서울 강남구 테헤란로",
    category: "기술", emoji: "💻", attendees: 45, maxAttendees: 60, price: "무료",
    host: "프론트엔드코리아", tags: ["React", "Next.js", "웹개발"], rsvpd: false,
  },
  {
    id: "2", title: "봄맞이 플리마켓", description: "핸드메이드 작품과 빈티지 아이템을 만나볼 수 있는 플리마켓입니다. 다양한 셀러들이 참여합니다.",
    date: "2026-04-12", time: "10:00 - 18:00", location: "서울 마포구 연남동",
    category: "라이프스타일", emoji: "🛍️", attendees: 120, maxAttendees: 200, price: "무료",
    host: "연남마켓", tags: ["플리마켓", "핸드메이드"], rsvpd: true,
  },
  {
    id: "3", title: "재즈 나이트 콘서트", description: "라이브 재즈 공연과 함께하는 특별한 밤. 와인과 음악을 즐기세요.",
    date: "2026-04-08", time: "19:30 - 22:00", location: "서울 이태원",
    category: "음악", emoji: "🎷", attendees: 38, maxAttendees: 50, price: "₩25,000",
    host: "재즈클럽서울", tags: ["재즈", "라이브"], rsvpd: false,
  },
  {
    id: "4", title: "스타트업 네트워킹 데이", description: "스타트업 창업자, 투자자, 개발자가 모이는 네트워킹 이벤트.\n\n피칭 세션과 자유로운 교류 시간이 준비되어 있습니다.",
    date: "2026-04-15", time: "18:00 - 21:00", location: "서울 성수동",
    category: "비즈니스", emoji: "🚀", attendees: 78, maxAttendees: 100, price: "₩10,000",
    host: "스타트업허브", tags: ["스타트업", "네트워킹"], rsvpd: false,
  },
  {
    id: "5", title: "요가 & 명상 워크숍", description: "초보자도 참여할 수 있는 요가와 명상 워크숍입니다. 편안한 복장으로 오세요.",
    date: "2026-04-06", time: "09:00 - 11:00", location: "서울 용산구",
    category: "건강", emoji: "🧘", attendees: 15, maxAttendees: 20, price: "₩15,000",
    host: "마인드풀라이프", tags: ["요가", "명상", "웰니스"], rsvpd: false,
  },
  {
    id: "6", title: "사진 전시회: 도시의 빛", description: "서울의 야경을 담은 사진 전시회. 20명의 작가가 참여합니다.",
    date: "2026-04-10", time: "11:00 - 20:00", location: "서울 종로구 인사동",
    category: "예술", emoji: "📸", attendees: 200, maxAttendees: 300, price: "₩8,000",
    host: "포토갤러리서울", tags: ["사진", "전시회"], rsvpd: true,
  },
];

const CATEGORIES = ["전체", "기술", "음악", "비즈니스", "라이프스타일", "건강", "예술"];

/* 간단 날짜 포맷 */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  const days = ["일","월","화","수","목","금","토"];
  return `${months[d.getMonth()]} ${d.getDate()}일 (${days[d.getDay()]})`;
}

export default function EventPlatformPage() {
  const [events, setEvents] = useState(EVENTS);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = events;
    if (selectedCategory !== "전체") {
      result = result.filter((e) => e.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) =>
        e.title.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedCategory, searchQuery]);

  /* RSVP 토글 */
  const toggleRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, rsvpd: !e.rsvpd, attendees: e.rsvpd ? e.attendees - 1 : e.attendees + 1 }
          : e
      )
    );
    if (selectedEvent?.id === eventId) {
      setSelectedEvent((prev) =>
        prev ? { ...prev, rsvpd: !prev.rsvpd, attendees: prev.rsvpd ? prev.attendees - 1 : prev.attendees + 1 } : null
      );
    }
  };

  /* 이벤트 상세 */
  if (selectedEvent) {
    const pct = Math.round((selectedEvent.attendees / selectedEvent.maxAttendees) * 100);
    return (
      <div className="flex h-screen flex-col bg-background">
        <header className="flex items-center gap-2 border-b px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)}><ArrowLeft className="h-4 w-4" /></Button>
          <h1 className="text-lg font-semibold">이벤트 상세</h1>
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-lg space-y-6">
            <div className="flex h-40 items-center justify-center rounded-xl bg-muted text-6xl">
              {selectedEvent.emoji}
            </div>
            <div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">{selectedEvent.category}</Badge>
              <h2 className="mt-2 text-2xl font-bold">{selectedEvent.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">주최: {selectedEvent.host}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="flex items-center gap-2 p-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">날짜</p>
                    <p className="font-medium">{formatDate(selectedEvent.date)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-2 p-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">시간</p>
                    <p className="font-medium">{selectedEvent.time}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-2 p-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">장소</p>
                    <p className="font-medium">{selectedEvent.location}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-2 p-3">
                  <Ticket className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">가격</p>
                    <p className="font-medium">{selectedEvent.price}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* 참가 현황 */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4" /> 참가 현황</span>
                  <span className="font-medium">{selectedEvent.attendees}/{selectedEvent.maxAttendees}명</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEvent.description}
              </CardContent>
            </Card>
            <div className="flex flex-wrap gap-2">
              {selectedEvent.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <Button
              onClick={() => toggleRsvp(selectedEvent.id)}
              variant={selectedEvent.rsvpd ? "outline" : "default"}
              className={cn(
                "w-full",
                selectedEvent.rsvpd && "border-primary bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              {selectedEvent.rsvpd ? (
                <span className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4" /> 참가 신청 완료</span>
              ) : "참가 신청하기"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Calendar className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">이벤트</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")} className={cn(viewMode === "grid" ? "text-primary" : "text-muted-foreground")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode("list")} className={cn(viewMode === "list" ? "text-primary" : "text-muted-foreground")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* 검색 + 카테고리 */}
      <div className="border-b px-4 py-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이벤트 검색..."
            className="w-full pl-10 pr-4"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* 이벤트 목록 */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer transition-colors hover:bg-accent/50"
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="flex flex-col p-4 text-left">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                      {event.emoji}
                    </div>
                    {event.rsvpd && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                        <Check className="h-3 w-3" /> 참가
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-primary">{event.category}</span>
                  <h3 className="mt-0.5 font-medium">{event.title}</h3>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(event.date)}</p>
                    <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</p>
                    <p className="flex items-center gap-1"><Users className="h-3 w-3" /> {event.attendees}/{event.maxAttendees}명</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold">{event.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer transition-colors hover:bg-accent/50"
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="flex w-full items-center gap-4 p-3 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                    {event.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-sm font-medium">{event.title}</h3>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{formatDate(event.date)}</span>
                      <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{event.attendees}명</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{event.price}</span>
                  {event.rsvpd && <Check className="h-4 w-4 text-green-500" />}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Calendar className="mb-3 h-12 w-12" />
            <p className="text-lg font-medium">이벤트가 없습니다</p>
            <p className="text-sm">다른 카테고리를 선택해보세요</p>
          </div>
        )}
      </main>
    </div>
  );
}
