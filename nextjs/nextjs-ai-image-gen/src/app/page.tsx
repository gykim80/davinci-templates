"use client";

import {
  ImagePlus,
  Loader2,
  Download,
  Sparkles,
  Grid3X3,
} from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  size: string;
  createdAt: number;
}

const SIZE_OPTIONS = [
  { value: "1024x1024", label: "정사각형 (1024x1024)" },
  { value: "1024x1792", label: "세로 (1024x1792)" },
  { value: "1792x1024", label: "가로 (1792x1024)" },
];

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setGallery(data.gallery);
        setPrompt("");
      }
    } catch {
      setError("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, size, isGenerating]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">AI 이미지 생성기</h1>
        <Badge variant="secondary" className="ml-auto">
          {gallery.length}개 이미지 생성됨
        </Badge>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 프롬프트 입력 패널 */}
        <div className="flex w-full flex-col border-r md:w-96">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  프롬프트
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="생성할 이미지를 설명하세요..."
                  rows={4}
                  className="resize-none rounded-xl"
                  disabled={isGenerating}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      handleGenerate();
                    }
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  이미지 크기
                </label>
                <Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-xl"
                  disabled={isGenerating}
                >
                  {SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full rounded-xl"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <ImagePlus className="h-4 w-4" />
                    이미지 생성
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Cmd/Ctrl + Enter로 빠르게 생성
              </p>
            </div>

            {/* 모바일용 갤러리 */}
            <div className="mt-6 md:hidden">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Grid3X3 className="h-4 w-4" />
                갤러리
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {gallery.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className="group relative aspect-square overflow-hidden rounded-lg border"
                  >
                    <img
                      src={img.url}
                      alt={img.prompt}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 갤러리 영역 */}
        <div className="hidden flex-1 overflow-y-auto p-4 md:block">
          {gallery.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <Grid3X3 className="mb-4 h-16 w-16" />
              <p className="text-lg">아직 생성된 이미지가 없습니다</p>
              <p className="text-sm">프롬프트를 입력하고 이미지를 생성해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {gallery.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="group relative aspect-square overflow-hidden rounded-xl border transition-all hover:ring-2 hover:ring-ring"
                >
                  <img
                    src={img.url}
                    alt={img.prompt}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="line-clamp-2 text-xs text-white">
                      {img.prompt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 이미지 상세 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Card
            className="max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.prompt}
              className="max-h-[70vh] w-full object-contain"
            />
            <div className="flex items-start gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm">{selectedImage.prompt}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedImage.size} |{" "}
                  {new Date(selectedImage.createdAt).toLocaleString("ko-KR")}
                </p>
              </div>
              <Button size="sm" asChild>
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-3 w-3" />
                  다운로드
                </a>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
