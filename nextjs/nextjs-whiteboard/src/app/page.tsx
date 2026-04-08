"use client";

import { useState, useCallback, useRef } from "react";
import {
  PenTool, Users, Share2, Download, Layers, Sparkles, Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ToolPalette, type ToolType } from "@/components/tool-palette";
import { ColorPicker } from "@/components/color-picker";
import { StrokeWidth } from "@/components/stroke-width";
import { CanvasBoard } from "@/components/canvas-board";

const highlights = [
  { icon: Layers, label: "무한 레이어" },
  { icon: Users, label: "실시간 협업" },
  { icon: Share2, label: "링크 공유" },
  { icon: Sparkles, label: "AI 도형 인식" },
];

export default function WhiteboardPage() {
  const [tool, setTool] = useState<ToolType>("pen");
  const [color, setColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [undoSignal, setUndoSignal] = useState(0);
  const [clearSignal, setClearSignal] = useState(0);
  const [started, setStarted] = useState(false);
  const canvasParentRef = useRef<HTMLDivElement>(null);

  const handleUndo = useCallback(() => setUndoSignal((s) => s + 1), []);
  const handleClear = useCallback(() => setClearSignal((s) => s + 1), []);

  const handleDownload = useCallback(() => {
    const canvas = canvasParentRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  // 랜딩 뷰
  if (!started) {
    return (
      <div className="min-h-screen bg-background dark:bg-background">
        <nav className="border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-bold dark:text-white">화이트보드</span>
            </div>
            <Button size="sm" onClick={() => setStarted(true)}>
              캔버스 열기
            </Button>
          </div>
        </nav>

        <section className="px-4 pb-16 pt-20 text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
            실시간 협업 지원
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl dark:text-white">
            아이디어를 자유롭게
            <br />
            <span className="text-blue-500">그려보세요</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            펜, 도형, 텍스트 도구로 빠르게 스케치하고 팀과 실시간으로 공유하세요.
            <br className="hidden sm:block" />
            PNG 내보내기, AI 도형 인식까지 지원합니다.
          </p>
          <Button size="lg" onClick={() => setStarted(true)} className="mb-12">
            <PenTool className="mr-2 h-4 w-4" /> 그리기 시작
          </Button>

          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((h) => (
              <Card key={h.label} className="dark:bg-card">
                <CardContent className="flex flex-col items-center gap-2 p-4">
                  <h.icon className="h-6 w-6 text-blue-500" />
                  <span className="text-sm font-medium dark:text-white">{h.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="border-t px-4 py-8 dark:border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2026 Whiteboard. 브라우저에서 바로 사용 가능합니다.
          </p>
        </footer>
      </div>
    );
  }

  // 캔버스 뷰
  return (
    <div className="flex h-screen flex-col bg-background dark:bg-background">
      <header className="flex flex-wrap items-center gap-4 border-b px-4 py-3 dark:border-border">
        <button
          onClick={() => setStarted(false)}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <PenTool className="h-5 w-5 text-blue-500" />
          <h1 className="text-lg font-bold dark:text-white">화이트보드</h1>
        </button>

        <div className="hidden h-6 w-px bg-border sm:block" />

        <ToolPalette
          activeTool={tool}
          onSelectTool={setTool}
          onUndo={handleUndo}
          onClear={handleClear}
          onDownload={handleDownload}
          canUndo={undoSignal >= 0}
        />

        <div className="hidden h-6 w-px bg-border sm:block" />
        <ColorPicker color={color} onChange={setColor} />

        <div className="hidden h-6 w-px bg-border sm:block" />
        <StrokeWidth width={strokeWidth} onChange={setStrokeWidth} />

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleUndo} title="실행취소">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload} title="PNG 다운로드">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

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
