import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, Clock, User, Eye, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllWikiPages, getWikiPage, getEditHistory } from "@/lib/wiki-data";
import { WikiSidebar } from "@/components/wiki-sidebar";

// 간단한 마크다운 → HTML 변환
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

export function generateStaticParams() {
  return getAllWikiPages().map((p) => ({ slug: p.slug }));
}

export default async function WikiPageView({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getWikiPage(slug);

  if (!page) {
    notFound();
  }

  const htmlContent = mdToHtml(page.content);
  const history = getEditHistory(slug);

  return (
    <div className="flex min-h-screen bg-background">
      {/* 사이드바 */}
      <WikiSidebar />

      {/* 본문 */}
      <main className="flex-1 overflow-y-auto">
        {/* 메타 바 */}
        <div className="flex items-center justify-between border-b px-8 py-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {page.updatedBy}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {page.updatedAt}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {page.views}회 조회
            </span>
          </div>
          <Link
            href={`/wiki/edit/${slug.join("/")}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg",
              "bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
              "transition-colors hover:bg-primary/90"
            )}
          >
            <Pencil className="h-3.5 w-3.5" />
            편집
          </Link>
        </div>

        {/* 콘텐츠 */}
        <div className="px-8 py-8">
          <div className="mx-auto max-w-3xl">
            <article
              className="max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* 편집 이력 */}
            {history.length > 0 && (
              <div className="mt-12 rounded-xl border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">편집 이력</h3>
                </div>
                <ul className="space-y-2">
                  {history.map((entry, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-xs text-muted-foreground"
                    >
                      <span>{entry.date}</span>
                      <span className="font-medium text-foreground">
                        {entry.author}
                      </span>
                      <span>{entry.summary}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
