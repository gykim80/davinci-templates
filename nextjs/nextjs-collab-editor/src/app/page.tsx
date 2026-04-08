"use client";

import { useState, useMemo } from "react";
import { FileText, Bold, Italic, Link2, Copy, Check, Eye, Pencil } from "lucide-react";

export default function CollabEditorPage() {
  const [content, setContent] = useState("# Hello World\n\nStart typing here...\n\n**Bold text** and *italic text* are supported.");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // 통계 계산
  const stats = useMemo(() => {
    const chars = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split("\n").length;
    return { chars, words, lines };
  }, [content]);

  // 텍스트 삽입 헬퍼
  const insertMarkdown = (prefix: string, suffix: string) => {
    setContent((prev) => prev + `${prefix}텍스트${suffix}`);
  };

  // 공유 링크 복사
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://example.com/doc/shared-abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 간단한 마크다운 -> HTML 변환
  const renderPreview = (text: string) => {
    return text
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">Collab Editor</h1>
        </div>
        <button
          onClick={() => setShowShareModal(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-transform hover:scale-105"
        >
          Share
        </button>
      </div>

      {/* 툴바 */}
      <div className="flex items-center gap-1 p-2 border border-border rounded-t-lg bg-muted/50">
        <button onClick={() => insertMarkdown("**", "**")} className="p-2 rounded hover:bg-accent transition-colors" title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button onClick={() => insertMarkdown("*", "*")} className="p-2 rounded hover:bg-accent transition-colors" title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button onClick={() => insertMarkdown("[", "](url)")} className="p-2 rounded hover:bg-accent transition-colors" title="Link">
          <Link2 className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        {/* 모드 전환 탭 */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setMode("edit")}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors ${mode === "edit" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            <Pencil className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors ${mode === "preview" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            <Eye className="w-3 h-3" /> Preview
          </button>
        </div>
      </div>

      {/* 에디터 / 프리뷰 */}
      {mode === "edit" ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 border border-t-0 border-border rounded-b-lg bg-card text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="마크다운을 입력하세요..."
        />
      ) : (
        <div
          className="w-full h-96 p-4 border border-t-0 border-border rounded-b-lg bg-card overflow-auto prose prose-invert max-w-none text-sm"
          dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
        />
      )}

      {/* 통계 바 */}
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span>{stats.chars} chars</span>
        <span>{stats.words} words</span>
        <span>{stats.lines} lines</span>
      </div>

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowShareModal(false)}>
          <div className="bg-card border border-border rounded-xl p-6 w-80 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold">Share Document</h2>
            <div className="flex gap-2">
              <input readOnly value="https://example.com/doc/shared-abc123" className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted text-xs" />
              <button onClick={handleCopyLink} className="p-2 rounded-lg bg-primary text-primary-foreground transition-transform hover:scale-105">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <button onClick={() => setShowShareModal(false)} className="w-full py-2 rounded-lg border border-border text-sm hover:bg-accent transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
