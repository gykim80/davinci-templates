"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ImageIcon, Loader2, ArrowUp } from "lucide-react";

// 그라디언트 플레이스홀더 이미지 생성
const GRADIENTS = [
  "from-violet-500 to-fuchsia-500", "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500", "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500", "from-indigo-500 to-purple-500",
  "from-amber-500 to-yellow-500", "from-lime-500 to-green-500",
];

// 이미지 카드 높이 (masonry 효과)
const HEIGHTS = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60"];

function generateItems(start: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    gradient: GRADIENTS[(start + i) % GRADIENTS.length],
    height: HEIGHTS[(start + i) % HEIGHTS.length],
    label: `Image #${start + i + 1}`,
  }));
}

export default function InfiniteScrollPage() {
  const [items, setItems] = useState(() => generateItems(0, 12));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // IntersectionObserver로 무한 스크롤
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          // 로딩 시뮬레이션
          setTimeout(() => {
            setItems((prev) => [...prev, ...generateItems(prev.length, 8)]);
            setLoading(false);
          }, 800);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading]);

  // 개별 아이템 fade-in 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const setItemRef = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  }, []);

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="text-center mb-8 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <ImageIcon className="w-6 h-6 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold">Infinite Scroll</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          IntersectionObserver 기반 무한 스크롤 + fade-in 애니메이션
        </p>
        <span className="inline-block px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
          {items.length}개 로드됨
        </span>
      </div>

      {/* Masonry 그리드 */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            ref={(el) => setItemRef(item.id, el)}
            className={`mb-4 break-inside-avoid rounded-xl bg-gradient-to-br ${item.gradient} ${item.height} flex items-end p-4 shadow-lg`}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <span className="text-white/90 text-sm font-medium backdrop-blur-sm bg-black/20 px-2 py-1 rounded">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 센티널 + 로딩 */}
      <div ref={sentinelRef} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">로딩 중...</span>
          </div>
        )}
      </div>

      {/* 스크롤 탑 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
        aria-label="맨 위로"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </main>
  );
}
