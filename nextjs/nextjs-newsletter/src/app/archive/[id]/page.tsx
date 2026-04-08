import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Newspaper } from "lucide-react";
import { newsletters, getNewsletterById } from "@/lib/newsletter-data";

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
  return newsletters.map((n) => ({ id: n.id }));
}

export default async function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const newsletter = getNewsletterById(id);

  if (!newsletter) {
    notFound();
  }

  const htmlContent = mdToHtml(newsletter.content);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">뉴스레터</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/archive"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          아카이브로 돌아가기
        </Link>

        <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{newsletter.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {newsletter.readTime}
          </span>
        </div>

        <article
          className="mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>
    </div>
  );
}
