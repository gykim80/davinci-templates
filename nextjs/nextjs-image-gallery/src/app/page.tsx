"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ImageIcon, Upload, Search, Grid3X3, LayoutGrid, Camera, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { images as allImages, type Category, type IImage } from "@/data/images";
import { CategoryFilter } from "@/components/category-filter";
import { GalleryGrid } from "@/components/gallery-grid";
import { Lightbox } from "@/components/lightbox";

const galleryStats = [
  { icon: Camera, label: "사진", value: "2,400+" },
  { icon: Heart, label: "좋아요", value: "12K" },
  { icon: Grid3X3, label: "컬렉션", value: "48" },
];

export default function GalleryPage() {
  const [category, setCategory] = useState<Category>("전체");
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");

  // 카테고리 + 검색 필터링
  const filtered = useMemo(() => {
    let result = category === "전체"
      ? allImages
      : allImages.filter((img) => img.category === category);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (img) =>
          img.title?.toLowerCase().includes(q) ||
          img.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, searchQuery]);

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
    <div className="min-h-screen bg-background dark:bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur dark:border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold dark:text-white">갤러리</h1>
            <Badge variant="secondary" className="rounded-full">
              {filtered.length}장
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setLayout("grid")}
              title="그리드 보기"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === "masonry" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setLayout("masonry")}
              title="메이슨리 보기"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Upload className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">업로드</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 히어로 통계 */}
      <section className="border-b bg-gradient-to-b from-muted/30 to-background px-4 py-10 dark:border-border dark:from-muted/10">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-2 text-2xl font-bold dark:text-white">
            순간을 기록하세요
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            카테고리별로 분류하고, 검색하고, 컬렉션으로 정리하세요.
          </p>
          <div className="mx-auto flex max-w-md justify-center gap-6">
            {galleryStats.map((s) => (
              <Card key={s.label} className="flex-1 dark:bg-card">
                <CardContent className="flex flex-col items-center gap-1 p-4">
                  <s.icon className="h-5 w-5 text-primary" />
                  <span className="text-lg font-bold dark:text-white">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 검색 + 필터 + 그리드 */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter selected={category} onSelect={setCategory} />
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="사진 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg pl-9 dark:bg-card"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <Search className="mb-4 h-12 w-12" />
            <p className="text-lg">검색 결과가 없습니다</p>
            <p className="text-sm">다른 키워드나 카테고리를 선택해보세요</p>
          </div>
        ) : (
          <GalleryGrid images={filtered} onSelect={setSelectedImage} />
        )}
      </main>

      {/* 라이트박스 */}
      <Lightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* 푸터 */}
      <footer className="border-t px-4 py-6 dark:border-border">
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2026 Gallery. 모든 이미지는 크리에이티브 커먼즈 라이선스로 제공됩니다.
        </p>
      </footer>
    </div>
  );
}
