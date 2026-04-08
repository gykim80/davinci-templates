"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Play, Pause, Clock, Calendar, Share2, Bookmark, Mic,
} from "lucide-react";
import { episodes, show, type IEpisode } from "@/data/episodes";
import { AudioPlayer } from "@/components/audio-player";

/** 에피소드 상세 내부 콘텐츠 */
function EpisodeContent() {
  const params = useSearchParams();
  const id = params.get("id") || "1";
  const episode = episodes.find((ep) => ep.id === id) || episodes[0];
  const [playing, setPlaying] = useState<IEpisode | null>(null);

  return (
    <div className={`min-h-screen bg-background ${playing ? "pb-24" : ""}`}>
      {/* 헤더 */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-1 hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Mic className="h-5 w-5 text-purple-500" />
        <span className="text-sm font-semibold">에피소드 상세</span>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* 에피소드 헤더 */}
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="h-32 w-32 shrink-0 rounded-xl object-cover shadow-md"
          />
          <div>
            <span className="text-xs text-muted-foreground">
              시즌 {episode.season} &middot; 에피소드 {episode.episode}
            </span>
            <h1 className="mt-1 text-xl font-bold">{episode.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{show.name}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {episode.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {episode.publishedAt}
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setPlaying(playing ? null : episode)}
            className="flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            {playing?.id === episode.id ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="h-4 w-4" fill="currentColor" />
            )}
            {playing?.id === episode.id ? "일시정지" : "재생하기"}
          </button>
          <button className="flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm hover:bg-muted">
            <Share2 className="h-3.5 w-3.5" />
            공유
          </button>
          <button className="flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm hover:bg-muted">
            <Bookmark className="h-3.5 w-3.5" />
            저장
          </button>
        </div>

        {/* 설명 */}
        <section className="mt-6">
          <h2 className="mb-2 font-semibold">소개</h2>
          <p className="text-sm leading-relaxed text-foreground/80">
            {episode.description}
          </p>
        </section>

        {/* 쇼노트 */}
        <section className="mt-6 rounded-xl bg-muted/30 p-5">
          <h2 className="mb-3 font-semibold">쇼노트</h2>
          <div className="prose prose-sm dark:prose-invert text-sm leading-relaxed text-foreground/80">
            {episode.showNotes.split("\n").map((line, i) => {
              if (line.startsWith("## "))
                return (
                  <h3 key={i} className="mt-3 mb-1 text-sm font-semibold">
                    {line.replace("## ", "")}
                  </h3>
                );
              if (line.startsWith("- "))
                return (
                  <p key={i} className="ml-4 text-sm">
                    &bull; {line.replace("- ", "")}
                  </p>
                );
              return line ? <p key={i}>{line}</p> : null;
            })}
          </div>
        </section>
      </main>

      {/* 하단 오디오 플레이어 */}
      <AudioPlayer episode={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}

export default function EpisodePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">로딩 중...</div>}>
      <EpisodeContent />
    </Suspense>
  );
}
