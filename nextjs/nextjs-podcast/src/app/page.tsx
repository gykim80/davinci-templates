"use client";

import { useState } from "react";
import { Mic, Bell, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { show, episodes, type IEpisode } from "@/data/episodes";
import { EpisodeCard } from "@/components/episode-card";
import { AudioPlayer } from "@/components/audio-player";
import { Playlist } from "@/components/playlist";

export default function PodcastPage() {
  const [currentEpisode, setCurrentEpisode] = useState<IEpisode | null>(null);

  return (
    <div className={`min-h-screen bg-background ${currentEpisode ? "pb-24" : ""}`}>
      {/* 헤더 */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
          <Mic className="h-5 w-5 text-purple-500" />
          <h1 className="text-lg font-bold">팟캐스트</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* 쇼 커버 + 정보 */}
        <section className="mb-8 flex flex-col gap-6 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={show.cover}
            alt={show.name}
            className="h-48 w-48 shrink-0 self-center rounded-2xl object-cover shadow-lg sm:self-start"
          />
          <div className="flex flex-col justify-center">
            <span className="mb-1 text-xs font-medium uppercase text-purple-500">
              {show.category}
            </span>
            <h2 className="text-2xl font-bold">{show.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              호스트: {show.host}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {show.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button className="flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">
                <Bell className="h-4 w-4" />
                구독하기
              </Button>
              <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2">
                <Rss className="h-4 w-4" />
                RSS
              </Button>
              <span className="text-sm text-muted-foreground">
                구독자 {show.subscribers}명
              </span>
            </div>
          </div>
        </section>

        {/* 에피소드 목록 + 재생목록 */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* 에피소드 목록 */}
          <section className="flex-1">
            <h3 className="mb-4 text-lg font-semibold">
              최신 에피소드
            </h3>
            <div className="space-y-3">
              {episodes.map((ep) => (
                <EpisodeCard
                  key={ep.id}
                  episode={ep}
                  onPlay={setCurrentEpisode}
                />
              ))}
            </div>
          </section>

          {/* 사이드바: 재생목록 */}
          <aside className="w-full shrink-0 lg:w-72">
            <Playlist
              episodes={episodes}
              currentId={currentEpisode?.id ?? null}
              onSelect={setCurrentEpisode}
            />
          </aside>
        </div>
      </main>

      {/* 하단 오디오 플레이어 */}
      <AudioPlayer
        episode={currentEpisode}
        onClose={() => setCurrentEpisode(null)}
      />
    </div>
  );
}
