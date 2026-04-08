"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Trash2,
  MousePointerClick,
  Calendar,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** 단축 URL 타입 */
export interface IShortenedUrl {
  id: string;
  originalUrl: string;
  shortSlug: string;
  clicks: number;
  createdAt: Date;
}

interface IUrlListProps {
  urls: IShortenedUrl[];
  onDelete: (id: string) => void;
  onSimulateClick: (id: string) => void;
}

/** 단축 링크 목록 */
export function UrlList({ urls, onDelete, onSimulateClick }: IUrlListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 클립보드 복사
  const copyToClipboard = async (url: IShortenedUrl) => {
    const shortUrl = `short.link/${url.shortSlug}`;
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(url.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (urls.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-muted-foreground">
        <QrCode className="mb-4 h-12 w-12" />
        <p className="text-lg">아직 단축 링크가 없습니다</p>
        <p className="text-sm">위에서 URL을 입력해보세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">
        최근 단축 링크 ({urls.length})
      </h3>

      {urls.map((url) => {
        const shortUrl = `short.link/${url.shortSlug}`;
        const isCopied = copiedId === url.id;

        return (
          <Card
            key={url.id}
            className="group bg-muted/20 transition-colors hover:bg-muted/30"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* 링크 정보 */}
                <div className="min-w-0 flex-1">
                  {/* 단축 URL */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-primary">{shortUrl}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(url)}
                      className={cn(
                        "h-6 w-6",
                        isCopied
                          ? "bg-green-500/20 text-green-400"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                      title="복사"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>

                  {/* 원본 URL */}
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {url.originalUrl}
                  </p>

                  {/* 메타 정보 */}
                  <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MousePointerClick className="h-3 w-3" />
                      {url.clicks.toLocaleString("ko-KR")}회 클릭
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {url.createdAt.toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSimulateClick(url.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    title="클릭 시뮬레이션"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(url.id)}
                    className="h-8 w-8 text-muted-foreground opacity-0 hover:text-red-400 group-hover:opacity-100"
                    title="삭제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* 클릭 바 (시각적 표현) */}
              {url.clicks > 0 && (
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all"
                    style={{ width: `${Math.min((url.clicks / 500) * 100, 100)}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
