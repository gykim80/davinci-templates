"use client";

import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ITrack } from "@/data/tracks";

interface ITrackListProps {
  tracks: ITrack[];
  currentTrackId: string | null;
  isPlaying: boolean;
  onSelect: (track: ITrack) => void;
}

/** 트랙 목록 테이블 */
export function TrackList({ tracks, currentTrackId, isPlaying, onSelect }: ITrackListProps) {
  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center gap-4 border-b px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
        <span className="w-8 text-center">#</span>
        <span className="flex-1">제목</span>
        <span className="hidden w-40 sm:block">앨범</span>
        <span className="w-16 text-right">시간</span>
        <span className="w-16" />
      </div>

      {/* 트랙 목록 */}
      <ul>
        {tracks.map((track, idx) => {
          const isCurrent = currentTrackId === track.id;
          return (
            <li
              key={track.id}
              className={cn(
                "group flex items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-muted/50",
                isCurrent && "bg-muted/30"
              )}
            >
              {/* 번호 / 재생 아이콘 */}
              <button
                onClick={() => onSelect(track)}
                className="flex h-8 w-8 shrink-0 items-center justify-center"
                aria-label={`${track.title} 재생`}
              >
                <span className="group-hover:hidden text-sm text-muted-foreground">
                  {isCurrent && isPlaying ? (
                    <Pause className="h-4 w-4 text-green-500" fill="currentColor" />
                  ) : (
                    idx + 1
                  )}
                </span>
                <Play
                  className="hidden h-4 w-4 group-hover:block"
                  fill="currentColor"
                />
              </button>

              {/* 곡 정보 */}
              <div className="flex flex-1 items-center gap-3 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track.albumArt}
                  alt={track.album}
                  className="h-10 w-10 shrink-0 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className={cn(
                    "truncate text-sm font-medium",
                    isCurrent && "text-green-500"
                  )}>
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* 앨범 */}
              <span className="hidden w-40 truncate text-sm text-muted-foreground sm:block">
                {track.album}
              </span>

              {/* 시간 */}
              <span className="w-16 text-right text-sm text-muted-foreground">
                {track.duration}
              </span>

              {/* 액션 */}
              <div className="flex w-16 items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded p-1 hover:bg-muted" aria-label="좋아요">
                  <Heart className="h-3.5 w-3.5" />
                </button>
                <button className="rounded p-1 hover:bg-muted" aria-label="더보기">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
