"use client";

import { useState, useCallback, useRef } from "react";
import { PenTool } from "lucide-react";
import { ToolPalette, type ToolType } from "@/components/tool-palette";
import { ColorPicker } from "@/components/color-picker";
import { StrokeWidth } from "@/components/stroke-width";
import { CanvasBoard } from "@/components/canvas-board";

export default function WhiteboardPage() {
  const [tool, setTool] = useState<ToolType>("pen");
  const [color, setColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [undoSignal, setUndoSignal] = useState(0);
  const [clearSignal, setClearSignal] = useState(0);
  const canvasParentRef = useRef<HTMLDivElement>(null);

  // Undo: 시그널 증가로 CanvasBoard에 전달
  const handleUndo = useCallback(() => {
    setUndoSignal((s) => s + 1);
  }, []);

  // Clear: 시그널 증가로 CanvasBoard에 전달
  const handleClear = useCallback(() => {
    setClearSignal((s) => s + 1);
  }, []);

  // 다운로드: 캔버스를 PNG로 저장
  const handleDownload = useCallback(() => {
    const canvas = canvasParentRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 상단 툴바 */}
      <header className="flex flex-wrap items-center gap-4 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <PenTool className="h-5 w-5 text-blue-500" />
          <h1 className="text-lg font-bold">화이트보드</h1>
        </div>

        {/* 구분선 */}
        <div className="hidden h-6 w-px bg-border sm:block" />

        {/* 도구 팔레트 */}
        <ToolPalette
          activeTool={tool}
          onSelectTool={setTool}
          onUndo={handleUndo}
          onClear={handleClear}
          onDownload={handleDownload}
          canUndo={undoSignal >= 0}
        />

        {/* 구분선 */}
        <div className="hidden h-6 w-px bg-border sm:block" />

        {/* 색상 선택 */}
        <ColorPicker color={color} onChange={setColor} />

        {/* 구분선 */}
        <div className="hidden h-6 w-px bg-border sm:block" />

        {/* 선 굵기 */}
        <StrokeWidth width={strokeWidth} onChange={setStrokeWidth} />
      </header>

      {/* 캔버스 영역 */}
      <main ref={canvasParentRef} className="flex-1 overflow-hidden p-2">
        <CanvasBoard
          tool={tool}
          color={color}
          strokeWidth={strokeWidth}
          undoSignal={undoSignal}
          clearSignal={clearSignal}
        />
      </main>
    </div>
  );
}
