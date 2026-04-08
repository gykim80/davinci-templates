"use client";

import { useState, useMemo, useCallback } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { images as allImages, type Category, type IImage } from "@/data/images";
import { CategoryFilter } from "@/components/category-filter";
import { GalleryGrid } from "@/components/gallery-grid";
import { Lightbox } from "@/components/lightbox";

export default function GalleryPage() {
  const [category, setCategory] = useState<Category>("전체");
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

  // 카테고리 필터링
  const filtered = useMemo(
    () =>
      category === "전체"
        ? allImages
        : allImages.filter((img) => img.category === category),
    [category]
  );

  // 라이트박스 네비게이션
  const currentIndex = selectedImage
    ? filtered.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setSelectedImage(filtered[currentIndex - 1]);
  }, [currentIndex, filtered]);

  const handleNext = useCallback(() => {
    if (currentIndex < filtered.length - 1)
      setSelectedImage(filtered[currentIndex + 1]);
  }, [currentIndex, filtered]);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">갤러리</h1>
            <Badge variant="secondary">
              {filtered.length}장
            </Badge>
          </div>
          <Button>
            <Upload className="h-4 w-4" />
            업로드
          </Button>
        </div>
      </header>

      {/* 필터 + 그리드 */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>
        <GalleryGrid images={filtered} onSelect={setSelectedImage} />
      </main>

      {/* 라이트박스 */}
      <Lightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
