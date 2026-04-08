"use client";

import { Home, Flame, Clock, ThumbsUp, PlaySquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { channels } from "@/data/videos";

const menuItems = [
  { icon: Home, label: "홈", active: true },
  { icon: Flame, label: "인기", active: false },
  { icon: Clock, label: "최신", active: false },
  { icon: ThumbsUp, label: "좋아요", active: false },
  { icon: PlaySquare, label: "재생목록", active: false },
];

/** 채널 사이드바 - 메뉴 + 구독 채널 */
export function ChannelSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r lg:block">
      <nav className="p-3">
        {/* 메뉴 */}
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  item.active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 구독 채널 */}
        <div className="mt-6 border-t pt-4">
          <h3 className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            구독 채널
          </h3>
          <ul className="space-y-1">
            {channels.map((ch) => (
              <li key={ch.name}>
                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ch.avatar}
                    alt={ch.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="truncate">{ch.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
