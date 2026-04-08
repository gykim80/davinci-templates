"use client";

import { useState } from "react";
import { Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface IUrlFormProps {
  onShorten: (url: string, customSlug?: string) => void;
  isLoading: boolean;
}

/** URL 입력 폼 */
export function UrlForm({ onShorten, isLoading }: IUrlFormProps) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    // URL 정규화 (http:// 자동 추가)
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    onShorten(normalizedUrl, customSlug.trim() || undefined);
    setUrl("");
    setCustomSlug("");
  };

  return (
    <Card className="bg-muted/20">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">URL 단축하기</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* URL 입력 */}
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very-long-url..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !url.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "단축"
              )}
            </Button>
          </div>

          {/* 커스텀 슬러그 */}
          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowCustom(!showCustom)}
              className="text-xs text-muted-foreground hover:text-foreground h-auto px-0 py-0"
            >
              {showCustom ? "▾ 커스텀 슬러그 숨기기" : "▸ 커스텀 슬러그 설정"}
            </Button>

            {showCustom && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">short.link/</span>
                <Input
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
                  placeholder="my-link"
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
