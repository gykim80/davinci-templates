"use client";

import { useState } from "react";
import { Search, BookOpen, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { posts, getAllTags, searchPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const allTags = getAllTags();
  const filteredPosts = query ? searchPosts(query) : posts;

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">블로그</h1>
          </div>
          <p className="text-muted-foreground">
            개발, 디자인, 기술에 대한 이야기를 나눕니다.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* 검색 */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="포스트 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl pl-10"
          />
        </div>

        {/* 태그 목록 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-full transition-colors hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <Link href={`/tags/${encodeURIComponent(tag)}`}>
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            </Badge>
          ))}
        </div>

        {/* 포스트 목록 */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              <Search className="mx-auto mb-4 h-12 w-12" />
              <p className="text-lg">검색 결과가 없습니다</p>
              <p className="text-sm">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
