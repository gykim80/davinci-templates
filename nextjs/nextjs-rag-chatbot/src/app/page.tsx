"use client";

import { useChat } from "ai/react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Upload,
  FileText,
  BookOpen,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadedFile {
  name: string;
  chunksAdded: number;
}

export default function RAGChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/chat" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadedFiles((prev) => [
          ...prev,
          { name: data.filename, chunksAdded: data.chunksAdded },
        ]);
      }
    } catch {
      // 에러 무시
    } finally {
      setIsUploading(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
      e.target.value = "";
    },
    [handleUpload]
  );

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바: 업로드된 문서 */}
      <aside className="hidden w-72 flex-col border-r md:flex">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <FileText className="h-4 w-4" />
          <span className="text-sm font-medium">업로드된 문서</span>
        </div>

        <div
          className={cn(
            "m-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-center text-xs text-muted-foreground">
                텍스트 파일을 드래그하거나
              </p>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 h-auto p-0 text-xs font-medium"
              >
                클릭하여 업로드
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.csv"
                className="hidden"
                onChange={onFileChange}
              />
            </>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          {uploadedFiles.map((f, i) => (
            <div
              key={i}
              className="mb-2 flex items-center gap-2 rounded-lg bg-muted px-3 py-2"
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">
                  {f.chunksAdded}개 청크
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 메인 채팅 영역 */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-2 border-b px-4 py-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">RAG 문서 챗봇</h1>
          <span className="ml-auto text-xs text-muted-foreground">
            {uploadedFiles.length}개 문서 업로드됨
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <BookOpen className="mb-4 h-12 w-12" />
                <p className="text-lg">문서를 업로드하고 질문하세요</p>
                <p className="text-sm">
                  AI가 문서 내용을 기반으로 답변합니다
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    문서에서 답변을 찾는 중...
                  </span>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </main>

        <footer className="border-t px-4 py-3">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-2xl items-center gap-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="문서에 대해 질문하세요..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
