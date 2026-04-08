"use client";

import { useState, useCallback } from "react";
import { Link2 } from "lucide-react";
import { UrlForm } from "@/components/url-form";
import { UrlList, type IShortenedUrl } from "@/components/url-list";
import { UrlStats } from "@/components/url-stats";

/** 랜덤 슬러그 생성 (6자) */
function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < 6; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

/** 샘플 데이터 */
const SAMPLE_URLS: IShortenedUrl[] = [
  {
    id: "1", originalUrl: "https://nextjs.org/docs/app/building-your-application",
    shortSlug: "nxt-doc", clicks: 342, createdAt: new Date("2025-03-20"),
  },
  {
    id: "2", originalUrl: "https://tailwindcss.com/docs/installation",
    shortSlug: "tw-css", clicks: 156, createdAt: new Date("2025-03-22"),
  },
  {
    id: "3", originalUrl: "https://github.com/vercel/next.js/discussions",
    shortSlug: "gh-njs", clicks: 89, createdAt: new Date("2025-03-25"),
  },
  {
    id: "4",
    originalUrl: "https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference",
    shortSlug: "mdn-js", clicks: 421, createdAt: new Date("2025-03-18"),
  },
];

export default function UrlShortenerPage() {
  const [urls, setUrls] = useState<IShortenedUrl[]>(SAMPLE_URLS);
  const [isLoading, setIsLoading] = useState(false);

  // URL 단축
  const shortenUrl = useCallback((originalUrl: string, customSlug?: string) => {
    setIsLoading(true);
    // 단축 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const newUrl: IShortenedUrl = {
        id: crypto.randomUUID(),
        originalUrl,
        shortSlug: customSlug || generateSlug(),
        clicks: 0,
        createdAt: new Date(),
      };
      setUrls((prev) => [newUrl, ...prev]);
      setIsLoading(false);
    }, 500);
  }, []);

  // 삭제
  const deleteUrl = useCallback((id: string) => {
    setUrls((prev) => prev.filter((u) => u.id !== id));
  }, []);

  // 클릭 시뮬레이션 (데모용)
  const simulateClick = useCallback((id: string) => {
    setUrls((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, clicks: u.clicks + Math.floor(Math.random() * 10) + 1 } : u
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">URL 단축기</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 p-6">
        {/* URL 입력 폼 */}
        <UrlForm onShorten={shortenUrl} isLoading={isLoading} />

        {/* 통계 */}
        <UrlStats urls={urls} />

        {/* 링크 목록 */}
        <UrlList urls={urls} onDelete={deleteUrl} onSimulateClick={simulateClick} />
      </main>
    </div>
  );
}
