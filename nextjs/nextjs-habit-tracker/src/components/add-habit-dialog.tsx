"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const EMOJIS = ["📚", "🏃", "💧", "🧘", "✍️", "🎵", "💪", "🥗"];
const COLORS = ["green", "blue", "purple", "orange", "pink"];
const COLOR_PREVIEW: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

interface IAddHabitDialogProps {
  onAdd: (name: string, emoji: string, color: string) => void;
  onClose: () => void;
}

/** 습관 추가 다이얼로그 */
export function AddHabitDialog({ onAdd, onClose }: IAddHabitDialogProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📚");
  const [color, setColor] = useState("green");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), emoji, color);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">새 습관 추가</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">습관 이름</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              placeholder="예: 독서 30분" autoFocus
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* 이모지 선택 */}
          <div>
            <label className="mb-1 block text-sm font-medium">아이콘</label>
            <div className="flex gap-2">
              {EMOJIS.map((e) => (
                <button key={e} type="button" onClick={() => setEmoji(e)}
                  className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-colors",
                    emoji === e ? "bg-accent ring-2 ring-ring" : "hover:bg-accent")}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* 색상 선택 */}
          <div>
            <label className="mb-1 block text-sm font-medium">색상</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setColor(c)}
                  className={cn("h-8 w-8 rounded-full transition-all", COLOR_PREVIEW[c],
                    color === c ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100")} />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-accent">취소</button>
            <button type="submit" disabled={!name.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
