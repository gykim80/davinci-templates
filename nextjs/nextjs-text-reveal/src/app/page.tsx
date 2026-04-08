"use client";

import { useEffect, useRef } from "react";
import { Type, Sparkles, Eye } from "lucide-react";

// 텍스트 리빌 섹션 데이터
const SECTIONS = [
  {
    title: "Design is not just what it looks like.",
    subtitle: "Design is how it works.",
    effect: "fade-up" as const,
  },
  {
    title: "Every pixel tells a story.",
    subtitle: "Make yours unforgettable.",
    effect: "slide-in" as const,
  },
  {
    title: "Clarity through simplicity.",
    subtitle: "Complexity is the enemy of execution.",
    effect: "blur-clear" as const,
  },
];

// 각 글자를 span으로 분리하는 유틸
function SplitText({
  text,
  effect,
  baseDelay,
}: {
  text: string;
  effect: string;
  baseDelay: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 이펙트별 초기/최종 스타일
  const getCharStyle = (i: number) => {
    const delay = baseDelay + i * 40;
    const base = { transition: `all 0.6s ease ${delay}ms`, display: "inline-block" };
    if (effect === "fade-up")
      return { ...base, opacity: 0, transform: "translateY(20px)" };
    if (effect === "slide-in")
      return { ...base, opacity: 0, transform: "translateX(-20px)" };
    // blur-clear
    return { ...base, opacity: 0, filter: "blur(8px)" };
  };

  return (
    <span ref={containerRef} className="reveal-container">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="reveal-char"
          style={getCharStyle(i)}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function TextRevealPage() {
  return (
    <main className="min-h-screen">
      {/* 히어로 */}
      <section className="h-screen flex flex-col items-center justify-center gap-4 p-4">
        <Type className="w-8 h-8 text-primary" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
          Text Reveal
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          스크롤하면 글자가 하나씩 나타납니다
        </p>
        <div className="mt-8 animate-bounce text-muted-foreground text-sm">scroll down</div>
      </section>

      {/* 리빌 섹션들 */}
      {SECTIONS.map((section, idx) => (
        <section
          key={idx}
          className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 sm:p-12"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
            {idx === 0 && <Sparkles className="w-4 h-4" />}
            {idx === 1 && <Eye className="w-4 h-4" />}
            {idx === 2 && <Type className="w-4 h-4" />}
            <span>{section.effect}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center max-w-3xl leading-tight">
            <SplitText text={section.title} effect={section.effect} baseDelay={0} />
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-xl">
            <SplitText text={section.subtitle} effect={section.effect} baseDelay={200} />
          </p>
        </section>
      ))}

      {/* 글로벌 스타일: revealed 상태에서 최종 스타일 적용 */}
      <style jsx global>{`
        .reveal-container.revealed .reveal-char {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      `}</style>
    </main>
  );
}
