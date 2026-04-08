"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Calendar } from "lucide-react";
import type { IImage } from "@/data/images";

interface ILightboxProps {
  image: IImage | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/** 이미지 라이트박스 모달 */
export function Lightbox({ image, onClose, onPrev, onNext }: ILightboxProps) {
  // 키보드 네비게이션
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!image) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 상세 보기"
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-10 rounded-full p-1 text-white/70 hover:text-white"
          aria-label="닫기"
        >
          <X className="h-6 w-6" />
        </button>

        {/* 이전 버튼 */}
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/70 hover:text-white"
          aria-label="이전 이미지"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* 이미지 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] rounded-lg object-contain"
        />

        {/* 다음 버튼 */}
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/70 hover:text-white"
          aria-label="다음 이미지"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* 이미지 정보 */}
        <div className="mt-3 flex items-center gap-4 text-sm text-white/70">
          <span className="font-medium text-white">{image.alt}</span>
          <span className="flex items-center gap-1">
            <Camera className="h-3.5 w-3.5" />
            {image.photographer}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {image.date}
          </span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-xs">
            {image.category}
          </span>
        </div>
      </div>
    </div>
  );
}
