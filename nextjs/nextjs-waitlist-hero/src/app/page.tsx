"use client";

import { useState } from "react";
import { Mail, Zap, Shield, Rocket, Users } from "lucide-react";

// 기능 카드 데이터
const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Built for performance from day one" },
  { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security baked in" },
  { icon: Rocket, title: "Ship Faster", desc: "From idea to production in minutes" },
  { icon: Users, title: "Team Ready", desc: "Collaborate seamlessly with your team" },
];

export default function WaitlistHeroPage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [count] = useState(1_234);

  // 웨이트리스트 등록 핸들러
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setJoined(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 애니메이션 그라디언트 배경 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-background to-blue-950" />
        <div
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-3xl"
          style={{ animation: "pulse 8s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl"
          style={{ animation: "pulse 10s ease-in-out infinite reverse" }}
        />
      </div>

      {/* 히어로 섹션 */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-20 text-center">
        {/* 그라디언트 텍스트 타이틀 */}
        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            The Future of
          </span>
          <br />
          <span className="text-foreground">Building Software</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Join the waitlist for early access to the next generation development platform.
          Be among the first to experience it.
        </p>

        {/* 이메일 입력 + 버튼 */}
        <form onSubmit={handleJoin} className="mt-8 flex w-full max-w-md gap-3">
          {joined ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-3 text-green-400">
              <Mail className="h-5 w-5" />
              You&apos;re on the list!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground backdrop-blur placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Join Waitlist
              </button>
            </>
          )}
        </form>

        {/* 소셜 프루프 카운터 */}
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="inline-block h-6 w-6 rounded-full border-2 border-background bg-gradient-to-br from-violet-400 to-blue-400"
              />
            ))}
          </span>
          <span className="font-semibold text-foreground">{count.toLocaleString()}</span>
          people already joined
        </p>
      </section>

      {/* 기능 하이라이트 카드 */}
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur transition-colors hover:border-violet-500/30 hover:bg-card/50"
            >
              <Icon className="mb-4 h-8 w-8 text-violet-400 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSS 애니메이션 키프레임 */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
}
