"use client";

import Link from "next/link";
import { Play, Clock, Calendar } from "lucide-react";
import type { IEpisode } from "@/data/episodes";

interface IEpisodeCardProps {
  episode: IEpisode;
  onPlay: (episode: IEpisode) => void;
}

/** 에피소드 카드 */
export function EpisodeCard({ episode, onPlay }: IEpisodeCardProps) {
  return (
    <div className="group flex gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50">
      {/* 썸네일 */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => onPlay(episode)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`${episode.title} 재생`}
        >
          <Play className="h-6 w-6 text-white" fill="white" />
        </button>
      </div>

      {/* 정보 */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/episode?id=${episode.id}`}
            className="text-sm font-semibold leading-snug hover:underline"
          >
            S{episode.season} E{episode.episode} - {episode.title}
          </Link>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {episode.description}
        </p>
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

      {/* 재생 버튼 */}
      <button
        onClick={() => onPlay(episode)}
        className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        aria-label="재생"
      >
        <Play className="h-4 w-4" fill="currentColor" />
      </button>
    </div>
  );
}
