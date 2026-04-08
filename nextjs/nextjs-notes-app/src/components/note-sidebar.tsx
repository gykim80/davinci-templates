"use client";

import { Search, Plus, FileText, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** 노트 타입 정의 */
export interface INote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: Date;
}

interface INoteSidebarProps {
  notes: INote[];
  selectedId: string | null;
  searchQuery: string;
  selectedTag: string | null;
  onSelect: (id: string) => void;
  onSearch: (query: string) => void;
  onAdd: () => void;
  onTagFilter: (tag: string | null) => void;
}

/** 노트 목록 사이드바 */
export function NoteSidebar({
  notes,
  selectedId,
  searchQuery,
  selectedTag,
  onSelect,
  onSearch,
  onAdd,
  onTagFilter,
}: INoteSidebarProps) {
  // 모든 태그 수집
  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  return (
    <aside className="flex h-full w-72 flex-col border-r bg-muted/30">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold">노트</h2>
        <button
          onClick={onAdd}
          className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent"
          title="새 노트"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* 검색 */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="노트 검색..."
            className="w-full rounded-md border bg-background py-2 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* 태그 필터 */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1 px-3 pb-2">
          {selectedTag && (
            <button
              onClick={() => onTagFilter(null)}
              className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground"
            >
              {selectedTag} <X className="h-2.5 w-2.5" />
            </button>
          )}
          {allTags
            .filter((t) => t !== selectedTag)
            .slice(0, 6)
            .map((tag) => (
              <button
                key={tag}
                onClick={() => onTagFilter(tag)}
                className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-accent-foreground hover:bg-accent/80"
              >
                <Tag className="mr-0.5 inline h-2.5 w-2.5" />
                {tag}
              </button>
            ))}
        </div>
      )}

      {/* 노트 목록 */}
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <FileText className="mb-2 h-8 w-8" />
            <p className="text-xs">노트가 없습니다</p>
          </div>
        ) : (
          notes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelect(note.id)}
              className={cn(
                "w-full border-b px-4 py-3 text-left transition-colors hover:bg-accent/50",
                selectedId === note.id && "bg-accent"
              )}
            >
              <p className="truncate text-sm font-medium">{note.title || "제목 없음"}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {note.content.slice(0, 60) || "내용 없음"}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">
                  {note.updatedAt.toLocaleDateString("ko-KR")}
                </span>
                {note.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-accent px-1 py-0.5 text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
