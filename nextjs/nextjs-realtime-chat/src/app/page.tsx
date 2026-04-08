"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Users,
  Hash,
  Plus,
  Search,
  Smile,
  Circle,
  Settings,
  ChevronLeft,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* 채팅방 타입 */
interface IChatRoom {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

/* 메시지 타입 */
interface IChatMessage {
  id: string;
  roomId: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  type: "message" | "system";
}

/* 온라인 유저 타입 */
interface IOnlineUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "busy";
}

/* 샘플 채팅방 */
const ROOMS: IChatRoom[] = [
  { id: "general", name: "일반", description: "자유롭게 대화하는 공간", icon: "#", memberCount: 128, lastMessage: "오늘 점심 뭐 먹지?", lastTime: "방금", unread: 3 },
  { id: "tech", name: "기술토론", description: "개발 관련 이야기", icon: "⚡", memberCount: 64, lastMessage: "React 19 써본 사람?", lastTime: "5분 전", unread: 0 },
  { id: "random", name: "잡담", description: "아무 이야기나", icon: "🎲", memberCount: 95, lastMessage: "ㅋㅋㅋ 그거 진짜임?", lastTime: "12분 전", unread: 7 },
  { id: "design", name: "디자인", description: "디자인 피드백과 공유", icon: "🎨", memberCount: 42, lastMessage: "새 로고 초안 봐주세요", lastTime: "1시간 전", unread: 1 },
  { id: "music", name: "음악추천", description: "오늘의 플레이리스트", icon: "🎵", memberCount: 56, lastMessage: "이 노래 진짜 좋다", lastTime: "3시간 전", unread: 0 },
];

/* 샘플 메시지 */
const MESSAGES: Record<string, IChatMessage[]> = {
  general: [
    { id: "m1", roomId: "general", author: "시스템", avatar: "🤖", content: "채팅방에 오신 것을 환영합니다!", timestamp: "10:00", isMe: false, type: "system" },
    { id: "m2", roomId: "general", author: "민수", avatar: "🧑", content: "안녕하세요~ 오늘 날씨 좋네요", timestamp: "10:15", isMe: false, type: "message" },
    { id: "m3", roomId: "general", author: "지은", avatar: "👩", content: "맞아요! 벚꽃이 다 피었더라고요 🌸", timestamp: "10:16", isMe: false, type: "message" },
    { id: "m4", roomId: "general", author: "나", avatar: "😊", content: "점심 같이 먹을 분 계세요?", timestamp: "10:20", isMe: true, type: "message" },
    { id: "m5", roomId: "general", author: "현우", avatar: "🧔", content: "저요! 어디서 먹을까요?", timestamp: "10:21", isMe: false, type: "message" },
    { id: "m6", roomId: "general", author: "소연", avatar: "👧", content: "저도 참여할게요~", timestamp: "10:22", isMe: false, type: "message" },
    { id: "m7", roomId: "general", author: "민수", avatar: "🧑", content: "회사 앞 새로 생긴 파스타집 어때요?", timestamp: "10:23", isMe: false, type: "message" },
    { id: "m8", roomId: "general", author: "나", avatar: "😊", content: "좋아요! 12시에 로비에서 만나요 👋", timestamp: "10:25", isMe: true, type: "message" },
  ],
  tech: [
    { id: "t1", roomId: "tech", author: "시스템", avatar: "🤖", content: "기술토론 채팅방입니다.", timestamp: "09:00", isMe: false, type: "system" },
    { id: "t2", roomId: "tech", author: "개발자A", avatar: "💻", content: "React 19 써본 분 있나요? use() 훅이 궁금합니다", timestamp: "09:30", isMe: false, type: "message" },
    { id: "t3", roomId: "tech", author: "개발자B", avatar: "🖥️", content: "네! 서버 컴포넌트랑 같이 쓰면 정말 편해요", timestamp: "09:35", isMe: false, type: "message" },
  ],
};

/* 온라인 유저 */
const ONLINE_USERS: IOnlineUser[] = [
  { id: "u1", name: "민수", avatar: "🧑", status: "online" },
  { id: "u2", name: "지은", avatar: "👩", status: "online" },
  { id: "u3", name: "현우", avatar: "🧔", status: "away" },
  { id: "u4", name: "소연", avatar: "👧", status: "online" },
  { id: "u5", name: "개발자A", avatar: "💻", status: "busy" },
  { id: "u6", name: "개발자B", avatar: "🖥️", status: "online" },
];

const STATUS_COLORS = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

export default function RealtimeChatPage() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const room = ROOMS.find((r) => r.id === activeRoom);
  const roomMessages = activeRoom ? (messages[activeRoom] || []) : [];

  /* 자동 스크롤 */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages.length]);

  /* 메시지 전송 */
  const handleSend = () => {
    if (!input.trim() || !activeRoom) return;
    const msg: IChatMessage = {
      id: `m${Date.now()}`, roomId: activeRoom, author: "나",
      avatar: "😊", content: input, timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      isMe: true, type: "message",
    };
    setMessages((prev) => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), msg],
    }));
    setInput("");

    /* 자동 응답 시뮬레이션 */
    setTimeout(() => {
      const replies = ["ㅎㅎ 그렇군요!", "좋은 생각이에요 👍", "동의합니다!", "재미있네요 ㅋㅋ"];
      const reply: IChatMessage = {
        id: `m${Date.now() + 1}`, roomId: activeRoom, author: "민수",
        avatar: "🧑", content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
        isMe: false, type: "message",
      };
      setMessages((prev) => ({
        ...prev,
        [activeRoom]: [...(prev[activeRoom] || []), reply],
      }));
    }, 1500);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        {activeRoom && (
          <Button variant="ghost" size="icon" onClick={() => { setActiveRoom(null); setShowUsers(false); }} className="md:hidden">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <MessageSquare className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">
          {room ? `${room.icon} ${room.name}` : "실시간 채팅"}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <span className={cn("flex items-center gap-1 text-xs", connected ? "text-green-500" : "text-red-500")}>
            {connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {connected ? "연결됨" : "오프라인"}
          </span>
          {activeRoom && (
            <Button variant="ghost" size="icon" onClick={() => setShowUsers(!showUsers)}>
              <Users className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 채팅방 목록 (사이드바) */}
        <aside className={cn(
          "w-full shrink-0 border-r md:w-64",
          activeRoom ? "hidden md:block" : "block"
        )}>
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="채팅방 검색..."
                className="w-full pl-9"
              />
            </div>
          </div>
          <div className="divide-y">
            {ROOMS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRoom(r.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-accent/50",
                  activeRoom === r.id && "bg-accent"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg">
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{r.name}</span>
                    <span className="text-[10px] text-muted-foreground">{r.lastTime}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{r.lastMessage}</p>
                </div>
                {r.unread > 0 && (
                  <Badge className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px]">
                    {r.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* 채팅 영역 */}
        {activeRoom ? (
          <div className="flex flex-1 flex-col">
            {/* 메시지 목록 */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {roomMessages.map((msg) => {
                if (msg.type === "system") {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{msg.content}</span>
                    </div>
                  );
                }
                return (
                  <div key={msg.id} className={cn("flex gap-2.5", msg.isMe ? "justify-end" : "justify-start")}>
                    {!msg.isMe && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm">
                        {msg.avatar}
                      </div>
                    )}
                    <div className={cn("max-w-[70%]", msg.isMe && "text-right")}>
                      {!msg.isMe && <p className="mb-0.5 text-xs font-medium">{msg.author}</p>}
                      <div className={cn(
                        "inline-block rounded-2xl px-3.5 py-2 text-sm",
                        msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        {msg.content}
                      </div>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{msg.timestamp}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={scrollRef} />
            </div>

            {/* 입력 바 */}
            <div className="border-t px-4 py-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="mx-auto mb-3 h-12 w-12" />
              <p className="text-lg font-medium">채팅방을 선택하세요</p>
              <p className="text-sm">왼쪽 목록에서 채팅방을 선택하면 대화를 시작할 수 있습니다</p>
            </div>
          </div>
        )}

        {/* 온라인 유저 패널 */}
        {showUsers && activeRoom && (
          <aside className="w-56 shrink-0 border-l">
            <div className="p-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase">접속 중 — {ONLINE_USERS.length}명</h3>
            </div>
            <div className="space-y-1 px-3">
              {ONLINE_USERS.map((user) => (
                <div key={user.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-accent/50">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm">
                      {user.avatar}
                    </div>
                    <div className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background", STATUS_COLORS[user.status])} />
                  </div>
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
