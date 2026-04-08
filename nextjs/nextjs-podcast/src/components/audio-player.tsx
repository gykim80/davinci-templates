"use client";

import { useState, useCallback } from "react";
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, X, Rewind, FastForward,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IEpisode } from "@/data/episodes";

interface IAudioPlayerProps {
  episode: IEpisode | null;
  onClose: () => void;
}

/** 하단 고정 오디오 플레이어 바 */
export function AudioPlayer({ episode, onClose }: IAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);

  // 프로그레스 바 클릭
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, pct)));
    },
    []
  );

  // 현재 시간 포맷
  const currentSec = episode ? Math.floor((progress / 100) * episode.durationSec) : 0;
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!episode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
      {/* 프로그레스 바 */}
      <div
        className="group h-1 cursor-pointer bg-muted transition-all hover:h-2"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        {/* 에피소드 정보 */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="h-12 w-12 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{episode.title}</p>
            <p className="text-xs text-muted-foreground">
              {formatTime(currentSec)} / {episode.duration}
            </p>
          </div>
        </div>

        {/* 재생 컨트롤 */}
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 hover:bg-muted" aria-label="15초 뒤로">
            <Rewind className="h-4 w-4" />
          </button>
          <button className="rounded-full p-1.5 hover:bg-muted" aria-label="이전">
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
            )}
          </button>
          <button className="rounded-full p-1.5 hover:bg-muted" aria-label="다음">
            <SkipForward className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 hover:bg-muted" aria-label="15초 앞으로">
            <FastForward className="h-4 w-4" />
          </button>
        </div>

        {/* 볼륨 + 닫기 */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => setMuted(!muted)}
            className="rounded-full p-1.5 hover:bg-muted"
            aria-label={muted ? "음소거 해제" : "음소거"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (muted) setMuted(false);
            }}
            className={cn("h-1 w-20 cursor-pointer appearance-none rounded-full bg-muted",
              "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-primary"
            )}
          />
          <button
            onClick={onClose}
            className="ml-2 rounded-full p-1.5 hover:bg-muted"
            aria-label="플레이어 닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
