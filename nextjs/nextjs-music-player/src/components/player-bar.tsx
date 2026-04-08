"use client";

import { useState, useCallback } from "react";
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Repeat, Shuffle, Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ITrack } from "@/data/tracks";

interface IPlayerBarProps {
  track: ITrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/** 하단 고정 음악 플레이어 바 */
export function PlayerBar({ track, isPlaying, onTogglePlay, onNext, onPrev }: IPlayerBarProps) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // 프로그레스 바 클릭
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, pct)));
    },
    []
  );

  // 시간 포맷
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentSec = track ? Math.floor((progress / 100) * track.durationSec) : 0;

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-2">
        {/* 트랙 정보 (좌측) */}
        <div className="flex items-center gap-3 min-w-0 w-1/4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={track.albumArt}
            alt={track.album}
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{track.title}</p>
            <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
          </div>
          <button className="shrink-0 rounded p-1 hover:bg-muted" aria-label="좋아요">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* 재생 컨트롤 (중앙) */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={cn("rounded-full p-1.5 hover:bg-muted", shuffle && "text-green-500")}
              aria-label="셔플"
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button onClick={onPrev} className="rounded-full p-1.5 hover:bg-muted" aria-label="이전 곡">
              <SkipBack className="h-5 w-5" fill="currentColor" />
            </button>
            <button
              onClick={onTogglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label={isPlaying ? "일시정지" : "재생"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
              )}
            </button>
            <button onClick={onNext} className="rounded-full p-1.5 hover:bg-muted" aria-label="다음 곡">
              <SkipForward className="h-5 w-5" fill="currentColor" />
            </button>
            <button
              onClick={() => setRepeat(!repeat)}
              className={cn("rounded-full p-1.5 hover:bg-muted", repeat && "text-green-500")}
              aria-label="반복"
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          {/* 프로그레스 바 */}
          <div className="flex w-full max-w-lg items-center gap-2">
            <span className="w-10 text-right text-xs text-muted-foreground">
              {formatTime(currentSec)}
            </span>
            <div
              className="group relative h-1 flex-1 cursor-pointer rounded-full bg-muted"
              onClick={handleProgressClick}
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
              />
            </div>
            <span className="w-10 text-xs text-muted-foreground">
              {track.duration}
            </span>
          </div>
        </div>

        {/* 볼륨 (우측) */}
        <div className="hidden w-1/4 items-center justify-end gap-2 sm:flex">
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
            className={cn(
              "h-1 w-24 cursor-pointer appearance-none rounded-full bg-muted",
              "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-primary"
            )}
          />
        </div>
      </div>
    </div>
  );
}
