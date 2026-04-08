"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Paintbrush, Undo2, Trash2, Download } from "lucide-react";

// 프리셋 색상
const COLORS = [
  "#ffffff", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899",
];

export default function DrawingCanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(4);
  const [history, setHistory] = useState<ImageData[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // 고해상도 대응
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, rect.width, rect.height);
    // 초기 상태 저장
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getPos(e);
    lastPos.current = pos;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }, [color, brushSize, getPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  }, [isDrawing, color, brushSize, getPos]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPos.current = null;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      setHistory((prev) => [...prev.slice(-19), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    }
  }, [isDrawing]);

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current, ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const prev = history.slice(0, -1);
    ctx.putImageData(prev[prev.length - 1], 0, 0);
    setHistory(prev);
  };

  const handleClear = () => {
    const canvas = canvasRef.current, ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "drawing.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-6">
        <Paintbrush className="w-6 h-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold">Drawing Canvas</h1>
      </div>

      {/* 툴바 */}
      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-xl border border-border bg-card w-full max-w-3xl">
        {/* 색상 선택 */}
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c ? "border-primary scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
              aria-label={`색상 ${c}`}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-border" />

        {/* 브러시 크기 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-6 text-right">{brushSize}px</span>
          <input
            type="range"
            min={1}
            max={24}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 accent-primary"
          />
        </div>

        <div className="flex-1" />

        {/* 액션 버튼 */}
        <div className="flex items-center gap-1">
          <button onClick={handleUndo} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Undo">
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={handleClear} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Clear">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={handleDownload} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Download PNG">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 캔버스 */}
      <div className="w-full max-w-3xl aspect-[4/3] rounded-xl border border-border overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">마우스로 드래그하여 그림을 그리세요</p>
    </main>
  );
}
