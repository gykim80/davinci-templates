"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWikiPage } from "@/lib/wiki-data";

// 간단한 마크다운 미리보기 변환
function mdToHtml(md: string): string {
  let html = md;
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="rounded-lg bg-muted p-4 overflow-x-auto my-4"><code class="text-sm">$2</code></pre>'
  );
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-muted px-1.5 py-0.5 text-sm">$1</code>'
  );
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="mt-6 mb-2 text-lg font-semibold">$1</h3>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="mt-8 mb-3 text-xl font-bold">$1</h2>'
  );
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="mb-4 text-2xl font-bold">$1</h1>'
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/\n\n/g, '</p><p class="my-3 leading-relaxed">');
  html = html.replace(/\n/g, "<br/>");
  return `<p class="my-3 leading-relaxed">${html}</p>`;
}

export default function WikiEditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string[]) || [];

  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const page = getWikiPage(slug);
    if (page) {
      setContent(page.content);
      setTitle(page.title);
    }
  }, [slug]);

  function handleSave() {
    // 인메모리 저장 (데모용 알림)
    alert("저장되었습니다! (데모: 인메모리 저장)");
    router.push(`/wiki/${slug.join("/")}`);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/wiki/${slug.join("/")}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              돌아가기
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs",
                  "transition-colors hover:bg-accent",
                  showPreview && "bg-accent"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                미리보기
              </button>
              <button
                onClick={handleSave}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg",
                  "bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
                  "transition-colors hover:bg-primary/90"
                )}
              >
                <Save className="h-3.5 w-3.5" />
                저장
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">{title} 편집</h1>

        {showPreview ? (
          /* 미리보기 모드 */
          <div className="rounded-xl border p-6">
            <article
              className="max-w-none"
              dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
            />
          </div>
        ) : (
          /* 편집 모드 */
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={cn(
              "min-h-[500px] w-full rounded-xl border bg-background p-4",
              "font-mono text-sm leading-relaxed outline-none",
              "focus:ring-2 focus:ring-ring"
            )}
            placeholder="마크다운으로 작성하세요..."
          />
        )}
      </main>
    </div>
  );
}
