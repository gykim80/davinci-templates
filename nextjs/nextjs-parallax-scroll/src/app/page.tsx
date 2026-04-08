"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Code, Layers, Palette, Sparkles } from "lucide-react";

// 패럴랙스 섹션 데이터
const sections = [
  {
    icon: Code,
    title: "Build with Confidence",
    desc: "Type-safe development with modern tooling that scales.",
    gradient: "from-violet-600/30 to-indigo-600/30",
  },
  {
    icon: Layers,
    title: "Layer by Layer",
    desc: "Composable architecture that grows with your project.",
    gradient: "from-blue-600/30 to-cyan-600/30",
  },
  {
    icon: Palette,
    title: "Design Systems",
    desc: "Consistent, beautiful UI powered by design tokens.",
    gradient: "from-emerald-600/30 to-teal-600/30",
  },
  {
    icon: Sparkles,
    title: "Ship and Iterate",
    desc: "From prototype to production in record time.",
    gradient: "from-amber-600/30 to-orange-600/30",
  },
];

export default function ParallaxScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 패럴랙스 스크롤 효과
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll<HTMLElement>("[data-parallax]");
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.5");
        const rect = el.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="scroll-smooth">
      {/* 히어로 섹션 */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-background to-background" />
        <div data-parallax="0.3" className="relative z-10 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Scroll
            <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Into the Future
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Experience smooth parallax transitions as you explore.
          </p>
        </div>
        <ArrowDown
          data-parallax="0.1"
          className="absolute bottom-12 h-6 w-6 text-muted-foreground"
          style={{ animation: "bounce 2s ease-in-out infinite" }}
        />
      </section>

      {/* 패럴랙스 콘텐츠 섹션 */}
      {sections.map(({ icon: Icon, title, desc, gradient }, i) => (
        <section key={title} className="relative min-h-screen overflow-hidden">
          {/* 배경 그라디언트 (placeholder for images) */}
          <div
            data-parallax="0.2"
            className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

          {/* 콘텐츠 */}
          <div
            data-parallax="0.4"
            className={`relative z-10 flex min-h-screen items-center px-4 ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="max-w-lg space-y-6 rounded-2xl border border-border/50 bg-card/50 p-10 backdrop-blur">
              <Icon className="h-12 w-12 text-violet-400" />
              <h2 className="text-4xl font-bold text-foreground">{title}</h2>
              <p className="text-lg text-muted-foreground">{desc}</p>
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />
            </div>
          </div>
        </section>
      ))}

      {/* 마지막 섹션 */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-bold text-foreground">Ready to Start?</h2>
        <p className="mt-4 text-muted-foreground">The journey begins with a single scroll.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-8 rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to Top
        </button>
      </section>

      {/* CSS 애니메이션 */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
