"use client";

import { useChat } from "ai/react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Wrench,
  CloudSun,
  Calculator,
  Search,
} from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// 도구 아이콘 매핑
const toolIcons: Record<string, React.ReactNode> = {
  weather: <CloudSun className="h-4 w-4" />,
  calculator: <Calculator className="h-4 w-4" />,
  web_search: <Search className="h-4 w-4" />,
};

// 도구 이름 한국어 매핑
const toolNames: Record<string, string> = {
  weather: "날씨 조회",
  calculator: "계산기",
  web_search: "웹 검색",
};

export default function AssistantPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/chat", maxSteps: 3 });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 도구 실행 결과 렌더링
  const renderToolResult = (toolName: string, result: Record<string, unknown>) => {
    if (toolName === "weather") {
      const w = result as {
        city: string;
        temperature: number;
        condition: string;
        humidity: number;
        unit: string;
      };
      return (
        <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2">
          <CloudSun className="h-8 w-8 text-yellow-400" />
          <div>
            <p className="text-sm font-medium">{w.city}</p>
            <p className="text-lg font-bold">
              {w.temperature}
              {w.unit}
            </p>
            <p className="text-xs text-muted-foreground">
              {w.condition} | 습도 {w.humidity}%
            </p>
          </div>
        </div>
      );
    }

    if (toolName === "calculator") {
      const c = result as {
        expression: string;
        result: number | null;
        success: boolean;
      };
      return (
        <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2">
          <Calculator className="h-6 w-6 text-blue-400" />
          <div>
            <p className="text-xs text-muted-foreground">{c.expression}</p>
            <p className="text-lg font-bold">
              {c.success ? `= ${c.result}` : "계산 오류"}
            </p>
          </div>
        </div>
      );
    }

    if (toolName === "web_search") {
      const s = result as {
        query: string;
        results: { title: string; snippet: string; url: string }[];
      };
      return (
        <div className="space-y-2 rounded-lg bg-accent/50 px-3 py-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-green-400" />
            <span className="text-xs text-muted-foreground">
              &quot;{s.query}&quot; 검색 결과
            </span>
          </div>
          {s.results.map((r, i) => (
            <div key={i} className="rounded border border-border/50 px-2 py-1.5">
              <p className="text-xs font-medium text-primary">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.snippet}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <pre className="rounded-lg bg-accent/50 p-2 text-xs">
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Wrench className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">AI 어시스턴트</h1>
        <div className="ml-auto flex gap-2">
          {Object.entries(toolIcons).map(([key, icon]) => (
            <Badge
              key={key}
              variant="secondary"
              className="flex items-center gap-1 rounded-full"
            >
              {icon}
              <span>{toolNames[key]}</span>
            </Badge>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Wrench className="mb-4 h-12 w-12" />
              <p className="text-lg">AI 어시스턴트에게 요청하세요</p>
              <p className="text-sm">
                날씨 조회, 계산, 웹 검색 등 도구를 활용합니다
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  &quot;서울 날씨 알려줘&quot;
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  &quot;1024 * 768 계산해줘&quot;
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  &quot;Next.js 검색해줘&quot;
                </Badge>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {/* 도구 호출 결과 표시 */}
              {message.toolInvocations?.map((invocation, i) => (
                <div key={i} className="ml-11">
                  {invocation.state === "result" &&
                    renderToolResult(
                      invocation.toolName,
                      invocation.result as Record<string, unknown>
                    )}
                  {invocation.state === "call" && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      {toolNames[invocation.toolName] || invocation.toolName}{" "}
                      실행 중...
                    </div>
                  )}
                </div>
              ))}

              {/* 텍스트 메시지 */}
              {message.content && (
                <div
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  도구를 사용하는 중...
                </span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </main>

      <footer className="border-t px-4 py-3">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="무엇이든 요청하세요... (날씨, 계산, 검색)"
            className="flex-1 rounded-xl"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
