"use client";

import { useState, useMemo } from "react";
import { PlayCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { videos, videoCategories, type VideoCategory } from "@/data/videos";
import { VideoCard } from "@/components/video-card";
import { ChannelSidebar } from "@/components/channel-sidebar";

export default function HomePage() {
  const [category, setCategory] = useState<VideoCategory>("전체");
  const [search, setSearch] = useState("");

  // 필터링
  const filtered = useMemo(() => {
    let result = videos;
    if (category !== "전체") {
      result = result.filter((v) => v.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, search]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 flex items-center gap-4 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <PlayCircle className="h-6 w-6 text-red-500" />
          <h1 className="text-lg font-bold">비디오</h1>
        </div>
        {/* 검색바 */}
        <div className="mx-auto flex max-w-md flex-1 items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색..."
            className="flex-1 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <ChannelSidebar />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* 카테고리 탭 */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {videoCategories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "secondary"}
                size="sm"
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 rounded-lg",
                  category !== cat && "text-muted-foreground hover:bg-accent"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* 비디오 그리드 */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <PlayCircle className="mb-4 h-12 w-12" />
              <p className="text-lg">영상이 없습니다</p>
              <p className="text-sm">다른 카테고리를 선택해보세요</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
