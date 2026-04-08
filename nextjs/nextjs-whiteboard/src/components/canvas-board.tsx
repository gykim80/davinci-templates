"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import type { ToolType } from "./tool-palette";

interface ICanvasBoardProps {
  tool: ToolType;
  color: string;
  strokeWidth: number;
  undoSignal: number;
  clearSignal: number;
}

// 히스토리 스냅샷 타입
type Snapshot = ImageData;

/** HTML5 Canvas 드로잉 보드 */
export function CanvasBoard({
  tool, color, strokeWidth, undoSignal, clearSignal,
}: ICanvasBoardProps) {
  /* PLACEHOLDER: state + refs */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [size, setSize] = useState({ w: 800, h: 600 });

  // 캔버스 초기화 + 리사이즈
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      // 기존 이미지 보존
      const ctx = canvas.getContext("2d");
      const imageData = ctx && canvas.width > 0 ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      setSize({ w, h });
      canvas.width = w;
      canvas.height = h;
      if (ctx && imageData) ctx.putImageData(imageData, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctxRef.current = ctx;
    }
    return () => ro.disconnect();
  }, []);

  // 스냅샷 저장 (드로잉 시작 전)
  const saveSnapshot = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  // 좌표 계산 헬퍼
  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  // 마우스/터치 다운
  const handleStart = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const ctx = ctxRef.current;
      if (!ctx) return;
      saveSnapshot();
      isDrawing.current = true;
      const pos = getPos(e);
      startPos.current = pos;
      if (tool === "pen" || tool === "eraser") {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    },
    [tool, saveSnapshot, getPos]
  );

  // 마우스/터치 무브
  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;
      const pos = getPos(e);

      if (tool === "pen") {
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.globalCompositeOperation = "source-over";
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = strokeWidth * 3;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else {
        // 도형: 이전 스냅샷 복원 후 프리뷰 그리기
        const prev = history[history.length - 1];
        if (prev) ctx.putImageData(prev, 0, 0);
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.globalCompositeOperation = "source-over";
        const { x: sx, y: sy } = startPos.current;
        ctx.beginPath();
        if (tool === "rect") {
          ctx.strokeRect(sx, sy, pos.x - sx, pos.y - sy);
        } else if (tool === "circle") {
          const rx = Math.abs(pos.x - sx) / 2;
          const ry = Math.abs(pos.y - sy) / 2;
          const cx = sx + (pos.x - sx) / 2;
          const cy = sy + (pos.y - sy) / 2;
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (tool === "line") {
          ctx.moveTo(sx, sy);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      }
    },
    [tool, color, strokeWidth, history, getPos]
  );

  // 마우스/터치 업
  const handleEnd = useCallback(() => {
    isDrawing.current = false;
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.closePath();
      ctx.globalCompositeOperation = "source-over";
    }
  }, []);

  // Undo 시그널 처리
  useEffect(() => {
    if (undoSignal === 0) return;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || history.length === 0) return;
    const prev = history[history.length - 1];
    ctx.putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  }, [undoSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear 시그널 처리
  useEffect(() => {
    if (clearSignal === 0) return;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    saveSnapshot();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [clearSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      width={size.w}
      height={size.h}
      className="cursor-crosshair rounded-xl border bg-white dark:bg-zinc-900"
      style={{ touchAction: "none" }}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    />
  );
}
