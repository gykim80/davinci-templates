"use client";

import {
  Pen, Eraser, Square, Circle, Minus,
  Undo2, Trash2, Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// 도구 타입 정의
export type ToolType = "pen" | "eraser" | "rect" | "circle" | "line";

interface ITool {
  type: ToolType;
  icon: typeof Pen;
  label: string;
}

const tools: ITool[] = [
  { type: "pen", icon: Pen, label: "펜" },
  { type: "eraser", icon: Eraser, label: "지우개" },
  { type: "rect", icon: Square, label: "사각형" },
  { type: "circle", icon: Circle, label: "원" },
  { type: "line", icon: Minus, label: "직선" },
];

interface IToolPaletteProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  onUndo: () => void;
  onClear: () => void;
  onDownload: () => void;
  canUndo: boolean;
}

/** 도구 팔레트 - 그리기 도구 선택 */
export function ToolPalette({
  activeTool,
  onSelectTool,
  onUndo,
  onClear,
  onDownload,
  canUndo,
}: IToolPaletteProps) {
  return (
    <div className="flex items-center gap-1">
      {/* 그리기 도구 */}
      {tools.map((tool) => (
        <Button
          key={tool.type}
          variant={activeTool === tool.type ? "default" : "ghost"}
          size="icon"
          onClick={() => onSelectTool(tool.type)}
          className={cn(
            "h-9 w-9",
            activeTool !== tool.type && "text-muted-foreground"
          )}
          aria-label={tool.label}
          title={tool.label}
        >
          <tool.icon className="h-4 w-4" />
        </Button>
      ))}

      {/* 구분선 */}
      <div className="mx-1 h-6 w-px bg-border" />

      {/* 액션 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onUndo}
        disabled={!canUndo}
        className="h-9 w-9 text-muted-foreground"
        aria-label="실행 취소"
        title="실행 취소"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="h-9 w-9 text-muted-foreground hover:text-red-500"
        aria-label="전체 지우기"
        title="전체 지우기"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDownload}
        className="h-9 w-9 text-muted-foreground"
        aria-label="다운로드"
        title="PNG 다운로드"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
