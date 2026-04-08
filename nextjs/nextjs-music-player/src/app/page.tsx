"use client";

import { useState, useCallback } from "react";
import { Music2 } from "lucide-react";
import { tracks, type ITrack } from "@/data/tracks";
import { SidebarNav } from "@/components/sidebar-nav";
import { NowPlaying } from "@/components/now-playing";
import { TrackList } from "@/components/track-list";
import { PlayerBar } from "@/components/player-bar";

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 트랙 선택
  const handleSelectTrack = useCallback(
    (track: ITrack) => {
      if (currentTrack?.id === track.id) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    },
    [currentTrack, isPlaying]
  );

  // 이전/다음
  const currentIndex = currentTrack
    ? tracks.findIndex((t) => t.id === currentTrack.id)
    : -1;

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(tracks[nextIdx]);
    setIsPlaying(true);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    setCurrentTrack(tracks[prevIdx]);
    setIsPlaying(true);
  }, [currentIndex]);

  return (
    <div className={`flex h-screen flex-col bg-background ${currentTrack ? "pb-20" : ""}`}>
      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <SidebarNav />

        {/* 메인 영역 */}
        <main className="flex flex-1 flex-col overflow-y-auto">
          {/* 모바일 헤더 */}
          <header className="flex items-center gap-2 border-b px-4 py-3 lg:hidden">
            <Music2 className="h-5 w-5 text-green-500" />
            <h1 className="text-lg font-bold">뮤직</h1>
          </header>

          <div className="flex flex-1 flex-col gap-6 p-4 xl:flex-row">
            {/* 현재 재생 중 */}
            <aside className="w-full shrink-0 xl:w-64">
              <NowPlaying track={currentTrack} isPlaying={isPlaying} />
            </aside>

            {/* 트랙 목록 */}
            <section className="flex-1 min-w-0">
              <h2 className="mb-4 text-lg font-bold">전체 트랙</h2>
              <TrackList
                tracks={tracks}
                currentTrackId={currentTrack?.id ?? null}
                isPlaying={isPlaying}
                onSelect={handleSelectTrack}
              />
            </section>
          </div>
        </main>
      </div>

      {/* 하단 플레이어 바 */}
      <PlayerBar
        track={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
