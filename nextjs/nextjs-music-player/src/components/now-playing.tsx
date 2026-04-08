"use client";

import { Disc3 } from "lucide-react";
import type { ITrack } from "@/data/tracks";

interface INowPlayingProps {
  track: ITrack | null;
  isPlaying: boolean;
}

/** 현재 재생 중 - 앨범 아트 + 트랙 정보 표시 */
export function NowPlaying({ track, isPlaying }: INowPlayingProps) {
  if (!track) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-muted/30 p-8">
        <Disc3 className="mb-4 h-16 w-16 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          곡을 선택해주세요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-xl bg-gradient-to-b from-muted/50 to-transparent p-6">
      {/* 앨범 아트 (회전 애니메이션) */}
      <div className="relative mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={track.albumArt}
          alt={track.album}
          className="h-48 w-48 rounded-2xl object-cover shadow-2xl transition-transform duration-700"
          style={{
            transform: isPlaying ? "scale(1.02)" : "scale(1)",
          }}
        />
        {isPlaying && (
          <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-green-500"
                style={{
                  height: `${8 + Math.random() * 16}px`,
                  animation: `pulse ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 트랙 정보 */}
      <h3 className="text-center text-lg font-bold">{track.title}</h3>
      <p className="text-sm text-muted-foreground">{track.artist}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{track.album}</p>
    </div>
  );
}
