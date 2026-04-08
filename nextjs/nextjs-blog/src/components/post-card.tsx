import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IPost } from "@/lib/posts";

interface IPostCardProps {
  post: IPost;
}

export function PostCard({ post }: IPostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article
        className={cn(
          "group rounded-xl border p-6 transition-colors",
          "hover:border-primary/50 hover:bg-accent/50"
        )}
      >
        {/* 제목 */}
        <h2 className="mb-2 text-xl font-bold group-hover:text-primary">
          {post.title}
        </h2>

        {/* 메타 정보 */}
        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
        </div>

        {/* 요약 */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {post.summary}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
