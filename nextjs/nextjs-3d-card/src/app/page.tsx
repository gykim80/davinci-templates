"use client";

import { useState, useCallback } from "react";
import { Layers, Palette, Box, Zap, Star, Shield } from "lucide-react";

// 샘플 기능 카드 데이터
const FEATURES = [
  { icon: Layers, title: "Layer System", desc: "다중 레이어 구성으로 복잡한 UI를 손쉽게", color: "from-violet-500 to-purple-600" },
  { icon: Palette, title: "Color Engine", desc: "DTCG 토큰 기반 색상 시스템", color: "from-cyan-500 to-blue-600" },
  { icon: Box, title: "Component Kit", desc: "재사용 가능한 디자인 컴포넌트", color: "from-emerald-500 to-green-600" },
  { icon: Zap, title: "Fast Render", desc: "CanvasKit 기반 60fps 렌더링", color: "from-orange-500 to-red-600" },
  { icon: Star, title: "AI Assist", desc: "자연어로 디자인 요소 생성", color: "from-pink-500 to-rose-600" },
  { icon: Shield, title: "Type Safety", desc: "TypeScript strict 모드 지원", color: "from-amber-500 to-yellow-600" },
];

// 3D 카드 컴포넌트 - onMouseMove로 tilt 계산
function TiltCard({
  feature,
}: {
  feature: (typeof FEATURES)[number];
}) {
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 20;
      const rotateY = (x - 0.5) * 20;
      setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
      setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  const Icon = feature.icon;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 cursor-pointer"
      style={{ transform, transition: "transform 0.15s ease-out" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 글레어 오버레이 */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          transition: "opacity 0.2s",
        }}
      />
      {/* 아이콘 */}
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.desc}</p>
    </div>
  );
}

export default function ThreeDCardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 lg:p-12">
      {/* 헤더 */}
      <div className="text-center space-y-3 mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">3D Card Hover</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          마우스를 카드 위에 올리면 CSS perspective 기반 3D 틸트 효과가 적용됩니다
        </p>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {FEATURES.map((feature) => (
          <TiltCard key={feature.title} feature={feature} />
        ))}
      </div>

      {/* 하단 설명 */}
      <div className="mt-12 text-center text-xs text-muted-foreground space-y-1">
        <p>CSS perspective + rotateX/Y + radial-gradient glare</p>
        <p>NO framer-motion - pure CSS transitions + onMouseMove</p>
      </div>
    </main>
  );
}
