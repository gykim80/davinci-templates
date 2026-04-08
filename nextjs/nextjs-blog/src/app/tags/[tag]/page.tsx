import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, Hash } from "lucide-react";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

// SSG: 정적 경로 생성
export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const filteredPosts = getPostsByTag(tag);

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            블로그로 돌아가기
          </Link>
          <div className="flex items-center gap-2">
            <Hash className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{tag}</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredPosts.length}개의 포스트
          </p>
        </div>
      </header>

      {/* 관련 태그 */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {getAllTags().map((t) => (
            <Link
              key={t}
              href={`/tags/${encodeURIComponent(t)}`}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors ${
                t === tag
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Tag className="h-3 w-3" />
              {t}
            </Link>
          ))}
        </div>

        {/* 포스트 목록 */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
