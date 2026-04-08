"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// 프리셋 색상
const presetColors = [
  "#000000", "#ffffff", "#ef4444", "#f97316",
  "#eab308", "#22c55e", "#3b82f6", "#8b5cf6",
];

interface IColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

/** 색상 선택기 */
export function ColorPicker({ color, onChange }: IColorPickerProps) {
  return (
    <div className="flex items-center gap-1.5">
      {presetColors.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "relative h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
            color === c ? "border-primary scale-110" : "border-transparent"
          )}
          style={{ backgroundColor: c }}
          aria-label={`색상 ${c}`}
        >
          {color === c && (
            <Check
              className={cn(
                "absolute inset-0 m-auto h-3.5 w-3.5",
                c === "#ffffff" || c === "#eab308" ? "text-black" : "text-white"
              )}
            />
          )}
        </button>
      ))}
      {/* 커스텀 색상 */}
      <label className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-7 w-7 cursor-pointer opacity-0"
        />
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground"
          style={{
            background: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`,
          }}
        />
      </label>
    </div>
  );
}
