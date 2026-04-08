"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image as ImageIcon,
  Send,
  User,
  Home,
  Search,
  Bell,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* 게시물 타입 */
interface IFeedPost {
  id: string;
  author: { name: string; handle: string; avatar: string; };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: IFeedComment[];
  bookmarked: boolean;
  liked: boolean;
}

/* 댓글 타입 */
interface IFeedComment {
  id: string;
  author: { name: string; avatar: string; };
  content: string;
  createdAt: string;
}

/* 샘플 데이터 */
const INITIAL_POSTS: IFeedPost[] = [
  {
    id: "1",
    author: { name: "김디자인", handle: "@design_kim", avatar: "🎨" },
    content: "새로운 디자인 시스템을 구축 중입니다. Figma에서 토큰 기반으로 설계하니까 개발팀과의 협업이 훨씬 수월해졌어요. 🎉\n\n#디자인시스템 #피그마 #토큰",
    image: "🖼️ 디자인 시스템 프리뷰",
    createdAt: "15분 전", likes: 42, bookmarked: false, liked: false,
    comments: [
      { id: "c1", author: { name: "UX연구자", avatar: "🔍" }, content: "토큰 기반 접근법 정말 좋죠! 어떤 도구 쓰시나요?", createdAt: "10분 전" },
      { id: "c2", author: { name: "프론트개발", avatar: "⚛️" }, content: "개발자로서 디자인 토큰 너무 감사합니다 ㅎㅎ", createdAt: "5분 전" },
    ],
  },
  {
    id: "2",
    author: { name: "이커피", handle: "@coffee_lee", avatar: "☕" },
    content: "오늘 발견한 숨은 카페. 핸드드립이 예술이었습니다. 오후의 여유를 만끽 중 ☕",
    image: "📸 카페 인테리어",
    createdAt: "1시간 전", likes: 128, bookmarked: true, liked: true,
    comments: [
      { id: "c3", author: { name: "카페러버", avatar: "🫖" }, content: "어디에요?! 위치 알려주세요!", createdAt: "45분 전" },
    ],
  },
  {
    id: "3",
    author: { name: "박코딩", handle: "@coding_park", avatar: "💻" },
    content: "오늘의 TIL: Next.js 15에서 Server Actions가 정말 강력해졌습니다.\n\nform action으로 서버 함수를 바로 호출할 수 있어서 API route를 만들 필요가 크게 줄었어요.\n\n클라이언트-서버 경계가 점점 자연스러워지는 느낌입니다.",
    createdAt: "3시간 전", likes: 89, bookmarked: false, liked: false,
    comments: [],
  },
  {
    id: "4",
    author: { name: "최여행", handle: "@travel_choi", avatar: "✈️" },
    content: "제주도 한달살기 2주차. 매일 아침 해변을 걸으며 시작하는 하루가 너무 좋습니다. 리모트 워크의 장점을 200% 활용 중 🌊",
    image: "🏖️ 제주 해변 풍경",
    createdAt: "5시간 전", likes: 256, bookmarked: false, liked: true,
    comments: [
      { id: "c4", author: { name: "노마드", avatar: "🎒" }, content: "부럽습니다! 숙소 추천 가능하신가요?", createdAt: "4시간 전" },
      { id: "c5", author: { name: "워케이션", avatar: "🏕️" }, content: "저도 다음달에 가려고요! 카페 추천 부탁드려요", createdAt: "2시간 전" },
    ],
  },
  {
    id: "5",
    author: { name: "정운동", handle: "@fitness_jung", avatar: "🏋️" },
    content: "100일 운동 챌린지 완료! 🎊\n매일 30분씩 꾸준히 하니까 정말 달라지네요.\n습관의 힘을 믿으세요 💪",
    createdAt: "8시간 전", likes: 312, bookmarked: false, liked: false,
    comments: [],
  },
];

/* 추가 로드용 게시물 */
const MORE_POSTS: IFeedPost[] = [
  {
    id: "6",
    author: { name: "한음악", handle: "@music_han", avatar: "🎵" },
    content: "새 앨범 작업 마무리 단계입니다. 이번에는 lo-fi와 재즈를 접목해봤어요. 기대해주세요! 🎹",
    createdAt: "12시간 전", likes: 78, bookmarked: false, liked: false, comments: [],
  },
  {
    id: "7",
    author: { name: "오독서", handle: "@book_oh", avatar: "📚" },
    content: "이번 주 읽은 책: '클린 아키텍처'\n\n의존성 역전, 경계 설정 등 아키텍처의 핵심 원칙을 명쾌하게 설명합니다. 개발자 필독서 추천!",
    createdAt: "1일 전", likes: 95, bookmarked: false, liked: false, comments: [],
  },
];

export default function SocialFeedPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState("home");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  /* 좋아요 토글 */
  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  /* 북마크 토글 */
  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p)
    );
  };

  /* 댓글 토글 */
  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  /* 댓글 추가 */
  const addComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const comment: IFeedComment = {
      id: `c${Date.now()}`,
      author: { name: "나", avatar: "😊" },
      content: text,
      createdAt: "방금 전",
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  /* 무한 스크롤 시뮬레이션 */
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setPosts((prev) => [...prev, ...MORE_POSTS.map((p) => ({ ...p, id: `${p.id}-${Date.now()}` }))]);
      setHasMore(false);
      setLoading(false);
    }, 1000);
  }, [loading, hasMore]);

  /* Intersection Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-semibold">소셜 피드</h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Search className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Bell className="h-5 w-5" /></Button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">😊</div>
        </div>
      </header>

      {/* 피드 */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-xl divide-y">
          {posts.map((post) => (
            <article key={post.id} className="px-4 py-4 space-y-3">
              {/* 작성자 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
                    {post.author.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.handle} · {post.createdAt}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* 본문 */}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

              {/* 이미지 (시뮬레이션) */}
              {post.image && (
                <div className="flex h-48 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-xs">{post.image}</span>
                  </div>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={cn("flex items-center gap-1.5 text-sm", post.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500")}
                  >
                    <Heart className={cn("h-4 w-4", post.liked && "fill-current")} />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {post.comments.length}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleBookmark(post.id)}
                  className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", post.bookmarked && "text-primary")}
                >
                  <Bookmark className={cn("h-4 w-4", post.bookmarked && "fill-current")} />
                </Button>
              </div>

              {/* 댓글 영역 */}
              {expandedComments.has(post.id) && (
                <div className="space-y-3 border-t pt-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs">
                        {comment.author.avatar}
                      </div>
                      <div>
                        <p className="text-xs">
                          <span className="font-semibold">{comment.author.name}</span>{" "}
                          <span className="text-muted-foreground">{comment.createdAt}</span>
                        </p>
                        <p className="mt-0.5 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="댓글 달기..."
                      className="flex-1 rounded-full px-3 py-1.5 text-sm"
                      onKeyDown={(e) => e.key === "Enter" && addComment(post.id)}
                    />
                    <Button
                      size="icon"
                      onClick={() => addComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      className="h-8 w-8 rounded-full"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </article>
          ))}

          {/* 무한 스크롤 로더 */}
          <div ref={loaderRef} className="flex items-center justify-center py-8">
            {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
            {!hasMore && !loading && (
              <p className="text-xs text-muted-foreground">모든 게시물을 확인했습니다</p>
            )}
          </div>
        </div>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="flex items-center justify-around border-t py-2">
        {[
          { id: "home", icon: Home, label: "홈" },
          { id: "search", icon: Search, label: "검색" },
          { id: "notifications", icon: Bell, label: "알림" },
          { id: "profile", icon: User, label: "프로필" },
        ].map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            variant="ghost"
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-4 py-1 h-auto",
              activeTab === id ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px]">{label}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
}
