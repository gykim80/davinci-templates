"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, Clock, ArrowRight, Newspaper, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { newsletters } from "@/lib/newsletter-data";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const latest = newsletters[0];

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">뉴스레터</span>
            </div>
            <Link
              href="/archive"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              아카이브
            </Link>
          </div>
        </div>
      </header>

      {/* 히어로 + 구독 폼 */}
      <section className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-3 text-3xl font-bold">기술 뉴스레터</h1>
          <p className="mb-8 text-muted-foreground">
            매주 최신 개발 트렌드, 실전 팁, 추천 아티클을 받아보세요.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto flex max-w-md items-center gap-2"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력하세요"
              required
              className="flex-1 rounded-xl px-4 py-2.5"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              구독하기
            </Button>
          </form>

          {message && (
            <p
              className={cn(
                "mt-3 text-sm",
                status === "success" ? "text-green-500" : "text-red-500"
              )}
            >
              {message}
            </p>
          )}
        </div>
      </section>

      {/* 최신 뉴스레터 미리보기 */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold">최신 뉴스레터</h2>

        <Link href={`/archive/${latest.id}`}>
          <Card
            className={cn(
              "group transition-colors",
              "hover:border-primary/50 hover:bg-accent/50"
            )}
          >
            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{latest.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {latest.readTime}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                {latest.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {latest.summary}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary">
                읽기 <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <div className="mt-6 text-center">
          <Link
            href="/archive"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            이전 뉴스레터 보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
