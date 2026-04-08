"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Clock,
  TrendingUp,
  ArrowRight,
  Eye,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { getRecentPages, getPopularPages, searchWikiPages } from "@/lib/wiki-data";
import type { IWikiPage } from "@/lib/wiki-data";

function PageItem({ page }: { page: IWikiPage }) {
  return (
    <Link href={`/wiki/${page.slug.join("/")}`}>
      <Card className="group transition-colors hover:border-primary/50 hover:bg-accent/50">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-medium group-hover:text-primary">
              {page.title}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {page.updatedBy}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {page.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {page.views}
              </span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function WikiHomePage() {
  const [query, setQuery] = useState("");
  const recentPages = getRecentPages(5);
  const popularPages = getPopularPages(5);
  const searchResults = query ? searchWikiPages(query) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">팀 위키</h1>
          </div>
          <p className="text-muted-foreground">
            팀의 지식을 공유하고 함께 성장하세요.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* 검색바 */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="위키 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl pl-10 pr-4"
          />
        </div>

        {/* 검색 결과 */}
        {query && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold">
              검색 결과 ({searchResults.length}건)
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((page) => (
                  <PageItem key={page.slug.join("/")} page={page} />
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        )}

        {/* 검색 중이 아닐 때 */}
        {!query && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* 최근 편집 */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">최근 편집</h2>
              </div>
              <div className="space-y-2">
                {recentPages.map((page) => (
                  <PageItem key={page.slug.join("/")} page={page} />
                ))}
              </div>
            </div>

            {/* 인기 페이지 */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">인기 페이지</h2>
              </div>
              <div className="space-y-2">
                {popularPages.map((page) => (
                  <PageItem key={page.slug.join("/")} page={page} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
