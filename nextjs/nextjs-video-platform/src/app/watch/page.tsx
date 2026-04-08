"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft, ThumbsUp, ThumbsDown, Share2, Bookmark,
  Bell, Eye, Calendar, PlayCircle,
} from "lucide-react";
import { videos } from "@/data/videos";
import { VideoCard } from "@/components/video-card";
import { CommentSection } from "@/components/comment-section";

/** 비디오 재생 페이지 - 내부 콘텐츠 */
function WatchContent() {
  const params = useSearchParams();
  const videoId = params.get("v") || "1";
  const video = videos.find((v) => v.id === videoId) || videos[0];
  // 추천 비디오: 같은 카테고리 또는 전체에서 현재 제외
  const recommended = videos.filter((v) => v.id !== video.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-1 hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <PlayCircle className="h-5 w-5 text-red-500" />
        <span className="text-sm font-semibold">비디오 플랫폼</span>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4 lg:flex lg:gap-6">
        {/* 왼쪽: 플레이어 + 정보 */}
        <div className="flex-1">
          {/* 비디오 플레이어 영역 (목 플레이어) */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition hover:bg-white/30">
                <PlayCircle className="h-12 w-12 text-white" />
              </button>
            </div>
          </div>

          {/* 비디오 정보 */}
          <h1 className="mt-4 text-xl font-bold">{video.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              조회수 {video.views}회
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {video.uploadedAt}
            </span>
          </div>

          {/* 액션 버튼 */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { icon: ThumbsUp, label: "좋아요" },
              { icon: ThumbsDown, label: "싫어요" },
              { icon: Share2, label: "공유" },
              { icon: Bookmark, label: "저장" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm transition-colors hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* 채널 정보 */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.channelAvatar} alt={video.channel} className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{video.channel}</p>
              <p className="text-xs text-muted-foreground">구독자 12만명</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Bell className="h-3.5 w-3.5" />
              구독
            </button>
          </div>

          {/* 설명 */}
          <div className="mt-4 rounded-xl bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80">
            {video.description}
          </div>

          {/* 댓글 */}
          <CommentSection />
        </div>

        {/* 오른쪽: 추천 비디오 */}
        <aside className="mt-6 w-full shrink-0 lg:mt-0 lg:w-80">
          <h3 className="mb-3 text-sm font-semibold">추천 비디오</h3>
          <div className="space-y-3">
            {recommended.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Suspense 래핑 (useSearchParams를 위해 필수) */
export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          로딩 중...
        </div>
      }
    >
      <WatchContent />
    </Suspense>
  );
}
