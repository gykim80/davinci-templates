"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import type { IVideo } from "@/data/videos";

interface IVideoCardProps {
  video: IVideo;
}

/** 비디오 카드 - 썸네일 + 정보 */
export function VideoCard({ video }: IVideoCardProps) {
  return (
    <Link
      href={`/watch?v=${video.id}`}
      className="group block overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
    >
      {/* 썸네일 */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {/* 재생 시간 */}
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          <Clock className="h-3 w-3" />
          {video.duration}
        </span>
      </div>

      {/* 비디오 정보 */}
      <div className="mt-3 flex gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.channelAvatar}
          alt={video.channel}
          className="h-9 w-9 shrink-0 rounded-full"
        />
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>
          <p className="text-xs text-muted-foreground">
            조회수 {video.views}회 &middot; {video.uploadedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}
