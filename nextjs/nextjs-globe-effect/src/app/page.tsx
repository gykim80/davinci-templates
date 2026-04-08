"use client";

import { useState } from "react";
import { Globe, Sparkles, Zap } from "lucide-react";

// CSS 3D 글로브 이펙트 - perspective + preserve-3d + rotateY 애니메이션
const DOTS = Array.from({ length: 80 }, (_, i) => {
  const phi = Math.acos(-1 + (2 * i) / 80);
  const theta = Math.sqrt(80 * Math.PI) * phi;
  const x = Math.cos(theta) * Math.sin(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(phi);
  return { x, y, z, id: i };
});

export default function GlobeEffectPage() {
  const [paused, setPaused] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      {/* 헤더 */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold">Globe Effect</h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          CSS 3D Transform으로 구현한 인터랙티브 글로브
        </p>
      </div>

      {/* 글로브 컨테이너 */}
      <div
        className="relative cursor-pointer"
        style={{ perspective: "800px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative"
          style={{
            transformStyle: "preserve-3d",
            animation: paused ? "none" : "spin 12s linear infinite",
          }}
        >
          {DOTS.map((dot) => (
            <div
              key={dot.id}
              className="absolute w-2 h-2 rounded-full bg-primary/80 transition-colors duration-300 hover:bg-accent"
              style={{
                left: `${50 + dot.x * 45}%`,
                top: `${50 + dot.y * 45}%`,
                transform: `translateZ(${dot.z * 120}px)`,
                opacity: 0.3 + (dot.z + 1) * 0.35,
              }}
            />
          ))}
          {/* 중심 글로우 */}
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl" />
        </div>

        {/* 상태 뱃지 */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
            {paused ? "일시정지" : "회전 중"}
          </span>
        </div>
      </div>

      {/* 기능 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mt-4">
        {[
          { icon: Globe, title: "3D Transform", desc: "CSS perspective + preserve-3d" },
          { icon: Sparkles, title: "80 Particles", desc: "구형 피보나치 분포 포인트" },
          { icon: Zap, title: "Interactive", desc: "호버 시 회전 일시정지" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-border bg-card p-4 text-center space-y-2 transition-shadow hover:shadow-lg"
          >
            <item.icon className="w-5 h-5 mx-auto text-primary" />
            <h3 className="font-semibold text-sm">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 글로벌 키프레임 */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotateY(0deg) rotateX(15deg); }
          to { transform: rotateY(360deg) rotateX(15deg); }
        }
      `}</style>
    </main>
  );
}
