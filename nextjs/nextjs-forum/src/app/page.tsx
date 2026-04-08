"use client";

import { useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Clock,
  Hash,
  ChevronRight,
  ArrowLeft,
  Send,
  PenSquare,
  User,
  Pin,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* 게시글 타입 */
interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: string;
  createdAt: string;
  views: number;
  likes: number;
  commentCount: number;
  pinned?: boolean;
  comments: IComment[];
}

/* 댓글 타입 */
interface IComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: IComment[];
}

/* 카테고리 */
const CATEGORIES = [
  { id: "all", name: "전체", icon: Filter },
  { id: "general", name: "자유게시판", icon: MessageSquare },
  { id: "tech", name: "기술", icon: Hash },
  { id: "qna", name: "질문/답변", icon: PenSquare },
  { id: "showcase", name: "쇼케이스", icon: Eye },
];

/* 샘플 데이터 */
const POSTS: IPost[] = [
  {
    id: "1", title: "Next.js 15에서 달라진 점 정리", content: "Next.js 15가 출시되면서 여러 변화가 있었습니다. App Router가 안정화되고 Turbopack이 기본으로 사용 가능해졌습니다.\n\n주요 변경사항:\n1. Turbopack 안정화\n2. React 19 서포트\n3. 개선된 캐싱 전략\n4. 서버 컴포넌트 최적화\n\n자세한 내용은 공식 블로그를 참고해 주세요.",
    author: "개발자김", avatar: "🧑‍💻", category: "tech", createdAt: "2시간 전", views: 234, likes: 45, commentCount: 12, pinned: true,
    comments: [
      { id: "c1", author: "코딩러", avatar: "👩‍💻", content: "좋은 정리 감사합니다! Turbopack 속도가 정말 빨라졌더라고요.", createdAt: "1시간 전", likes: 8,
        replies: [
          { id: "c1r1", author: "개발자김", avatar: "🧑‍💻", content: "맞아요! HMR 속도가 체감될 정도로 빨라졌습니다.", createdAt: "45분 전", likes: 3 },
        ]
      },
      { id: "c2", author: "뉴비개발", avatar: "🐣", content: "App Router 아직 적응 중인데 참고가 많이 되네요!", createdAt: "30분 전", likes: 5 },
    ],
  },
  {
    id: "2", title: "React 상태 관리, 뭐 쓰시나요?", content: "프로젝트마다 상태 관리 라이브러리를 고민하게 되는데요, 요즘 트렌드가 궁금합니다. Zustand, Jotai, Redux Toolkit 중에서 어떤 걸 주로 사용하시나요?",
    author: "프론트엔드러", avatar: "⚛️", category: "qna", createdAt: "5시간 전", views: 156, likes: 23, commentCount: 8,
    comments: [
      { id: "c3", author: "주스탠드팬", avatar: "🐻", content: "Zustand 추천합니다! 보일러플레이트가 거의 없어요.", createdAt: "4시간 전", likes: 12 },
      { id: "c4", author: "조타이유저", avatar: "👻", content: "Jotai가 atomic 패턴이라 리렌더링 관리에 좋습니다.", createdAt: "3시간 전", likes: 9 },
    ],
  },
  {
    id: "3", title: "사이드 프로젝트 같이 하실 분!", content: "AI 기반 학습 플랫폼을 만들어보려고 합니다. 관심 있으신 분 댓글 남겨주세요.\n\n기술 스택: Next.js, TypeScript, Tailwind, Supabase",
    author: "메이커", avatar: "🚀", category: "general", createdAt: "1일 전", views: 89, likes: 15, commentCount: 6,
    comments: [
      { id: "c5", author: "풀스택킴", avatar: "🎯", content: "관심 있습니다! DM 드려도 될까요?", createdAt: "20시간 전", likes: 4 },
    ],
  },
  {
    id: "4", title: "포트폴리오 사이트 피드백 부탁드려요", content: "처음으로 포트폴리오 사이트를 만들어봤습니다. 디자인이나 UX 관련 피드백을 받고 싶어요.",
    author: "주니어", avatar: "🌱", category: "showcase", createdAt: "2일 전", views: 312, likes: 34, commentCount: 15,
    comments: [
      { id: "c6", author: "시니어", avatar: "🏅", content: "전체적으로 깔끔하네요! 모바일 반응형만 좀 더 신경쓰면 좋겠어요.", createdAt: "1일 전", likes: 7 },
    ],
  },
  {
    id: "5", title: "TypeScript 5.8 새로운 기능들", content: "TypeScript 5.8에서 추가된 기능들을 정리해봤습니다. 특히 Erasable Syntax-only Imports가 인상적이었습니다.",
    author: "타입러버", avatar: "📘", category: "tech", createdAt: "3일 전", views: 445, likes: 67, commentCount: 20,
    comments: [],
  },
];

export default function ForumPage() {
  const [posts, setPosts] = useState(POSTS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCat, setNewCat] = useState("general");

  const filtered = selectedCategory === "all"
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  /* 정렬: 고정 글 먼저 */
  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  /* 댓글 추가 */
  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;
    const comment: IComment = {
      id: `c${Date.now()}`, author: "나", avatar: "😊",
      content: newComment, createdAt: "방금 전", likes: 0,
    };
    const updated = posts.map((p) =>
      p.id === selectedPost.id
        ? { ...p, comments: [...p.comments, comment], commentCount: p.commentCount + 1 }
        : p
    );
    setPosts(updated);
    setSelectedPost(updated.find((p) => p.id === selectedPost.id) || null);
    setNewComment("");
  };

  /* 새 글 작성 */
  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const post: IPost = {
      id: `p${Date.now()}`, title: newTitle, content: newContent,
      author: "나", avatar: "😊", category: newCat,
      createdAt: "방금 전", views: 0, likes: 0, commentCount: 0, comments: [],
    };
    setPosts([post, ...posts]);
    setShowNewPost(false);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        {selectedPost ? (
          <Button variant="ghost" size="icon" onClick={() => setSelectedPost(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        ) : null}
        <MessageSquare className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">커뮤니티 포럼</h1>
        {!selectedPost && (
          <Button
            size="sm"
            onClick={() => setShowNewPost(!showNewPost)}
            className="ml-auto"
          >
            <PenSquare className="h-3.5 w-3.5" />
            글쓰기
          </Button>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 - 카테고리 (데스크탑) */}
        {!selectedPost && (
          <aside className="hidden w-48 shrink-0 border-r md:block">
            <nav className="p-3 space-y-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    variant="ghost"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex w-full items-center justify-start gap-2 h-auto px-3 py-2 text-sm",
                      selectedCategory === cat.id ? "bg-accent font-medium" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.name}
                  </Button>
                );
              })}
            </nav>
          </aside>
        )}

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          {/* 모바일 카테고리 탭 */}
          {!selectedPost && (
            <div className="flex gap-2 overflow-x-auto border-b px-4 py-2 md:hidden">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap rounded-full"
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          )}

          {/* 새 글 작성 폼 */}
          {showNewPost && !selectedPost && (
            <div className="border-b p-4 space-y-3">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="내용을 입력하세요"
                rows={4}
                className="resize-none"
              />
              <div className="flex items-center gap-2">
                <Select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                >
                  {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newTitle.trim() || !newContent.trim()}
                  size="sm"
                >
                  게시하기
                </Button>
              </div>
            </div>
          )}

          {/* 게시글 목록 */}
          {!selectedPost && (
            <div className="divide-y">
              {sorted.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-lg">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {post.pinned && <Pin className="h-3 w-3 text-primary" />}
                      <h3 className="truncate font-medium text-sm">{post.title}</h3>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{post.content}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{post.createdAt}</span>
                      <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{post.views}</span>
                      <span className="flex items-center gap-0.5"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                      <span className="flex items-center gap-0.5"><MessageSquare className="h-3 w-3" />{post.commentCount}</span>
                    </div>
                  </div>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}

          {/* 게시글 상세 */}
          {selectedPost && (
            <div className="p-4 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{CATEGORIES.find(c => c.id === selectedPost.category)?.name}</Badge>
                </div>
                <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">{selectedPost.avatar}</span>
                    {selectedPost.author}
                  </span>
                  <span>{selectedPost.createdAt}</span>
                  <span className="flex items-center gap-0.5"><Eye className="h-3.5 w-3.5" />{selectedPost.views}</span>
                </div>
              </div>

              <Card>
                <CardContent className="p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </CardContent>
              </Card>

              <div className="flex items-center gap-4 text-sm">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="h-4 w-4" /> {selectedPost.likes}
                </Button>
              </div>

              {/* 댓글 영역 */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">댓글 {selectedPost.comments.length}개</h3>
                {selectedPost.comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="mt-1 text-sm">{comment.content}</p>
                        <Button variant="ghost" size="sm" className="mt-1 h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="h-3 w-3" /> {comment.likes}
                        </Button>
                      </div>
                    </div>
                    {/* 대댓글 */}
                    {comment.replies?.map((reply) => (
                      <div key={reply.id} className="ml-11 flex gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs">
                          {reply.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                          </div>
                          <p className="mt-1 text-sm">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* 댓글 입력 */}
                <div className="flex gap-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  />
                  <Button
                    size="icon"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
