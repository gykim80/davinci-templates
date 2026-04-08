import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocSlugs, extractToc } from "@/lib/docs";
import { DocSidebar } from "@/components/doc-sidebar";
import { Toc } from "@/components/toc";

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
    (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h2 id="${id}" class="mt-8 mb-3 text-xl font-bold">${text}</h2>`;
    }
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
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const tocItems = extractToc(doc.content);
  const htmlContent = mdToHtml(doc.content);

  return (
    <div className="flex min-h-screen bg-background">
      {/* 사이드바 */}
      <DocSidebar />

      {/* 본문 */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-3xl">
          <article
            className="max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </main>

      {/* TOC */}
      <Toc items={tocItems} />
    </div>
  );
}
