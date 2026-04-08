"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import type { IImage } from "@/data/images";

interface IGalleryGridProps {
  images: IImage[];
  onSelect: (image: IImage) => void;
}

/** 메이슨리 스타일 이미지 그리드 */
export function GalleryGrid({ images, onSelect }: IGalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <ImageIcon className="mb-4 h-12 w-12" />
        <p className="text-lg">이미지가 없습니다</p>
        <p className="text-sm">다른 카테고리를 선택해보세요</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {images.map((image) => (
        <button
          key={image.id}
          onClick={() => onSelect(image)}
          className={cn(
            "group relative mb-4 block w-full overflow-hidden rounded-xl",
            "break-inside-avoid transition-transform hover:scale-[1.02]"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full rounded-xl object-cover"
            loading="lazy"
          />
          {/* 호버 오버레이 */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="p-3 text-left text-white">
              <p className="text-sm font-medium">{image.alt}</p>
              <p className="text-xs text-white/70">{image.photographer}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
