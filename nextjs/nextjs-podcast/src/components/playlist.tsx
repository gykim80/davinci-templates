"use client";

import { Play, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IEpisode } from "@/data/episodes";

interface IPlaylistProps {
  episodes: IEpisode[];
  currentId: string | null;
  onSelect: (episode: IEpisode) => void;
}

/** 재생목록 사이드 패널 */
export function Playlist({ episodes, currentId, onSelect }: IPlaylistProps) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <ListMusic className="h-4 w-4" />
        재생목록
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {episodes.length}
        </span>
      </h3>
      <ul className="space-y-1">
        {episodes.map((ep) => (
          <li key={ep.id}>
            <button
              onClick={() => onSelect(ep)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                currentId === ep.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <Play
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  currentId === ep.id && "text-primary"
                )}
                fill={currentId === ep.id ? "currentColor" : "none"}
              />
              <span className="min-w-0 truncate">
                E{ep.episode}. {ep.title}
              </span>
              <span className="ml-auto shrink-0 text-xs">{ep.duration}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
