import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsletters } from "@/lib/newsletter-data";

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">뉴스레터</span>
            </div>
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              홈으로
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          홈으로 돌아가기
        </Link>

        <h1 className="mb-8 text-2xl font-bold">뉴스레터 아카이브</h1>

        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <Link key={newsletter.id} href={`/archive/${newsletter.id}`}>
              <div
                className={cn(
                  "group rounded-xl border p-5 transition-colors",
                  "hover:border-primary/50 hover:bg-accent/50"
                )}
              >
                <div className="mb-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{newsletter.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {newsletter.readTime}
                  </span>
                </div>
                <h2 className="mb-1 font-semibold group-hover:text-primary">
                  {newsletter.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {newsletter.summary}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  읽기 <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
