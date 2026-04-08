"use client";

import { useState, useMemo } from "react";
import {
  Mail,
  Send,
  FileText,
  Trash2,
  AlertTriangle,
  Search,
  Star,
  Pencil,
  X,
  ArrowLeft,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MOCK_EMAILS, FOLDERS, type IEmail, type FolderType } from "@/data/emails";

export default function EmailClientPage() {
  const [emails, setEmails] = useState<IEmail[]>(MOCK_EMAILS);
  const [activeFolder, setActiveFolder] = useState<FolderType>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<IEmail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  // 폴더 아이콘 매핑
  const folderIcons: Record<FolderType, React.ReactNode> = {
    inbox: <Inbox className="h-4 w-4" />,
    sent: <Send className="h-4 w-4" />,
    drafts: <FileText className="h-4 w-4" />,
    trash: <Trash2 className="h-4 w-4" />,
    spam: <AlertTriangle className="h-4 w-4" />,
  };

  // 필터링된 이메일 목록
  const filteredEmails = useMemo(() => {
    return emails
      .filter((e) => e.folder === activeFolder)
      .filter(
        (e) =>
          !searchQuery ||
          e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.from.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [emails, activeFolder, searchQuery]);

  // 읽지 않은 수
  const unreadCount = (folder: FolderType) =>
    emails.filter((e) => e.folder === folder && !e.read).length;

  // 이메일 선택 시 읽음 처리
  const handleSelect = (email: IEmail) => {
    setSelectedEmail(email);
    if (!email.read) {
      setEmails((prev) =>
        prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
      );
    }
  };

  // 별표 토글
  const handleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((em) => (em.id === id ? { ...em, starred: !em.starred } : em))
    );
  };

  // 날짜 포맷
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 — 폴더 목록 */}
      <aside className="flex w-56 shrink-0 flex-col border-r">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Mail className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">메일</h1>
        </div>
        <Button
          onClick={() => setShowCompose(true)}
          className="mx-3 mt-3 rounded-xl"
        >
          <Pencil className="h-4 w-4" />
          새 메일 작성
        </Button>
        <nav className="mt-3 flex-1 space-y-0.5 px-2">
          {FOLDERS.map((f) => (
            <Button
              key={f.key}
              variant="ghost"
              onClick={() => {
                setActiveFolder(f.key);
                setSelectedEmail(null);
              }}
              className={cn(
                "flex w-full items-center gap-3 justify-start h-auto px-3 py-2 text-sm",
                activeFolder === f.key
                  ? "bg-muted font-medium"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              {folderIcons[f.key]}
              <span className="flex-1 text-left">{f.label}</span>
              {unreadCount(f.key) > 0 && (
                <Badge className="rounded-full px-2 py-0.5 text-xs">
                  {unreadCount(f.key)}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </aside>

      {/* 이메일 목록 */}
      <div className="flex w-80 shrink-0 flex-col border-r">
        {/* 검색 */}
        <div className="border-b px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이메일 검색..."
              className="w-full pl-9 pr-3"
            />
          </div>
        </div>
        {/* 목록 */}
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Mail className="mb-2 h-8 w-8" />
              <p className="text-sm">이메일이 없습니다</p>
            </div>
          ) : (
            filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => handleSelect(email)}
                className={cn(
                  "flex w-full flex-col gap-1 border-b px-4 py-3 text-left transition-colors hover:bg-muted/50",
                  selectedEmail?.id === email.id && "bg-muted",
                  !email.read && "bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm truncate", !email.read && "font-semibold")}>
                    {email.from.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => handleStar(email.id, e)}>
                      <Star
                        className={cn(
                          "h-3.5 w-3.5",
                          email.starred
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(email.date)}
                    </span>
                  </div>
                </div>
                <span className={cn("text-sm truncate", !email.read && "font-medium")}>
                  {email.subject}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {email.preview}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* 이메일 상세 / 빈 상태 */}
      <main className="flex flex-1 flex-col">
        {selectedEmail ? (
          <>
            <div className="flex items-center gap-3 border-b px-6 py-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedEmail(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="flex-1 text-lg font-semibold">{selectedEmail.subject}</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {selectedEmail.from.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedEmail.from.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedEmail.from.email}</p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(selectedEmail.date).toLocaleString("ko-KR")}
                </span>
              </div>
              {selectedEmail.labels && (
                <div className="mb-4 flex gap-2">
                  {selectedEmail.labels.map((l) => (
                    <Badge key={l} variant="secondary">
                      {l}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {selectedEmail.body}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <Mail className="mb-3 h-12 w-12" />
            <p className="text-sm">이메일을 선택하세요</p>
          </div>
        )}
      </main>

      {/* 작성 모달 */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-6">
          <Card className="flex h-96 w-full max-w-lg flex-col rounded-2xl shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-semibold">새 메일 작성</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCompose(false)} className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 border-b px-4 py-2">
              <Input placeholder="받는 사람" className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
              <Input placeholder="제목" className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
            </div>
            <Textarea
              placeholder="메시지를 입력하세요..."
              className="flex-1 resize-none border-0 bg-transparent px-4 py-3 text-sm shadow-none focus-visible:ring-0"
            />
            <div className="flex justify-end border-t px-4 py-3">
              <Button className="rounded-xl">
                <Send className="h-4 w-4" />
                보내기
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
