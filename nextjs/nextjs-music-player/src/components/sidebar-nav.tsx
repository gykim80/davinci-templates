"use client";

import { Home, Search, Library, Heart, PlusCircle, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { playlists } from "@/data/tracks";

const navItems = [
  { icon: Home, label: "홈", active: true },
  { icon: Search, label: "검색", active: false },
  { icon: Library, label: "라이브러리", active: false },
];

/** 사이드바 네비게이션 */
export function SidebarNav() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r lg:flex">
      {/* 로고 */}
      <div className="flex items-center gap-2 px-5 py-4">
        <Music2 className="h-6 w-6 text-green-500" />
        <span className="text-lg font-bold">뮤직</span>
      </div>

      {/* 메인 메뉴 */}
      <nav className="px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  item.active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 구분선 */}
      <div className="my-4 border-t mx-5" />

      {/* 재생목록 */}
      <div className="flex-1 overflow-y-auto px-3">
        <div className="mb-2 flex items-center justify-between px-3">
          <span className="text-xs font-semibold uppercase text-muted-foreground">
            재생목록
          </span>
          <button className="rounded p-1 hover:bg-muted" aria-label="재생목록 추가">
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
          <Heart className="h-4 w-4 text-red-400" />
          좋아하는 곡
        </button>
        {playlists.map((pl) => (
          <button
            key={pl.id}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pl.cover}
              alt={pl.name}
              className="h-8 w-8 rounded object-cover"
            />
            <div className="min-w-0 text-left">
              <p className="truncate text-sm">{pl.name}</p>
              <p className="text-xs text-muted-foreground">{pl.trackCount}곡</p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
