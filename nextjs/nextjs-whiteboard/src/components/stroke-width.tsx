"use client";

import { cn } from "@/lib/utils";

interface IStrokeWidthProps {
  width: number;
  onChange: (width: number) => void;
}

/** 선 굵기 조절 슬라이더 */
export function StrokeWidth({ width, onChange }: IStrokeWidthProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-5 text-right">{width}</span>
      <input
        type="range"
        min="1"
        max="20"
        value={width}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted",
          "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
        )}
      />
      {/* 미리보기 원 */}
      <div
        className="rounded-full bg-foreground"
        style={{ width: `${width}px`, height: `${width}px` }}
      />
    </div>
  );
}
