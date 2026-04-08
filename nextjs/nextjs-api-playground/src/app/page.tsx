"use client";

import { useState, useCallback } from "react";
import {
  Play,
  Clock,
  Trash2,
  Plus,
  X,
  Loader2,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// HTTP 메서드 색상
const METHOD_COLORS: Record<string, string> = {
  GET: "text-green-400",
  POST: "text-blue-400",
  PUT: "text-yellow-400",
  PATCH: "text-orange-400",
  DELETE: "text-red-400",
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IHeader {
  key: string;
  value: string;
  enabled: boolean;
}

interface IHistoryItem {
  id: string;
  method: HttpMethod;
  url: string;
  status: number;
  elapsed: number;
  timestamp: string;
}

interface IResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  elapsed: number;
}

// JSON 구문 하이라이팅 (간단 구현)
function highlightJson(json: string): string {
  return json
    .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="text-purple-400">$1</span>:')
    .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="text-green-400">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="text-yellow-400">$1</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="text-blue-400">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="text-red-400">$1</span>');
}

// JSON 포맷팅 시도
function tryFormatJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

export default function ApiPlaygroundPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [headers, setHeaders] = useState<IHeader[]>([
    { key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [body, setBody] = useState('{\n  "title": "test",\n  "body": "content"\n}');
  const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");
  const [responseTab, setResponseTab] = useState<"body" | "headers">("body");
  const [response, setResponse] = useState<IResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<IHistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 요청 실행
  const sendRequest = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // 활성화된 헤더를 객체로 변환
      const headerObj: Record<string, string> = {};
      headers.filter((h) => h.enabled && h.key).forEach((h) => {
        headerObj[h.key] = h.value;
      });

      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          method,
          headers: headerObj,
          body: method !== "GET" ? body : undefined,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data);
        // 히스토리에 추가
        setHistory((prev) => [
          {
            id: Date.now().toString(),
            method,
            url,
            status: data.status,
            elapsed: data.elapsed,
            timestamp: new Date().toLocaleTimeString("ko-KR"),
          },
          ...prev.slice(0, 19), // 최대 20개
        ]);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body]);

  // 헤더 추가
  const addHeader = () => {
    setHeaders((prev) => [...prev, { key: "", value: "", enabled: true }]);
  };

  // 헤더 삭제
  const removeHeader = (idx: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== idx));
  };

  // 응답 본문 복사
  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // 히스토리에서 복원
  const restoreFromHistory = (item: IHistoryItem) => {
    setMethod(item.method);
    setUrl(item.url);
  };

  const formattedBody = response ? tryFormatJson(response.body) : "";

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-6 py-3">
        <Zap className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">API Playground</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 메인 영역 */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* URL 바 */}
          <div className="flex items-center gap-2 border-b px-6 py-3">
            <Select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className={cn(
                "rounded-lg font-bold",
                METHOD_COLORS[method]
              )}
            >
              {(["GET", "POST", "PUT", "PATCH", "DELETE"] as const).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              onKeyDown={(e) => e.key === "Enter" && sendRequest()}
              className="flex-1 rounded-lg"
            />
            <Button
              onClick={sendRequest}
              disabled={loading || !url.trim()}
              className="rounded-xl"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              전송
            </Button>
          </div>

          {/* 요청 설정 (탭) */}
          <div className="border-b">
            <div className="flex gap-4 px-6">
              {(["headers", "body"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "border-b-2 px-1 py-2.5 text-sm transition-colors",
                    activeTab === tab
                      ? "border-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "headers" ? "헤더" : "본문"}
                </button>
              ))}
            </div>
          </div>

          {/* 탭 내용 */}
          <div className="h-40 shrink-0 overflow-y-auto border-b px-6 py-3">
            {activeTab === "headers" ? (
              <div className="space-y-2">
                {headers.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      onChange={(e) => {
                        const next = [...headers];
                        next[idx].enabled = e.target.checked;
                        setHeaders(next);
                      }}
                      className="rounded"
                    />
                    <Input
                      value={h.key}
                      onChange={(e) => {
                        const next = [...headers];
                        next[idx].key = e.target.value;
                        setHeaders(next);
                      }}
                      placeholder="Key"
                      className="flex-1"
                    />
                    <Input
                      value={h.value}
                      onChange={(e) => {
                        const next = [...headers];
                        next[idx].value = e.target.value;
                        setHeaders(next);
                      }}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeHeader(idx)} className="h-8 w-8 hover:text-red-400">
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addHeader}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3" /> 헤더 추가
                </Button>
              </div>
            ) : (
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="h-full resize-none font-mono"
              />
            )}
          </div>

          {/* 응답 영역 */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b px-6">
              <div className="flex gap-4">
                {(["body", "headers"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setResponseTab(tab)}
                    className={cn(
                      "border-b-2 px-1 py-2.5 text-sm transition-colors",
                      responseTab === tab
                        ? "border-primary font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab === "body" ? "응답 본문" : "응답 헤더"}
                  </button>
                ))}
              </div>
              {response && (
                <div className="flex items-center gap-3 text-xs">
                  <span className={cn(
                    "font-bold",
                    response.status < 300 ? "text-green-400" :
                    response.status < 400 ? "text-yellow-400" : "text-red-400"
                  )}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-muted-foreground">{response.elapsed}ms</span>
                  <Button variant="ghost" size="icon" onClick={copyResponse} className="h-7 w-7">
                    {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-auto p-6">
              {error ? (
                <div className="rounded-xl bg-destructive/10 p-4 text-sm text-red-400">{error}</div>
              ) : loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : response ? (
                responseTab === "body" ? (
                  <pre
                    className="whitespace-pre-wrap font-mono text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightJson(formattedBody) }}
                  />
                ) : (
                  <div className="space-y-1 font-mono text-xs">
                    {Object.entries(response.headers).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-purple-400">{k}</span>:{" "}
                        <span className="text-muted-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Zap className="mb-3 h-10 w-10" />
                  <p className="text-sm">요청을 보내면 응답이 여기에 표시됩니다</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 히스토리 사이드바 */}
        <aside className="flex w-64 shrink-0 flex-col border-l">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">히스토리</h2>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHistory([])}
                className="ml-auto h-7 w-7 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              <p className="px-4 py-8 text-center text-xs text-muted-foreground">
                아직 요청 기록이 없습니다
              </p>
            ) : (
              history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => restoreFromHistory(item)}
                  className="flex w-full flex-col gap-0.5 border-b px-4 py-2.5 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-bold", METHOD_COLORS[item.method])}>
                      {item.method}
                    </span>
                    <span className={cn(
                      "text-xs font-medium",
                      item.status < 300 ? "text-green-400" :
                      item.status < 400 ? "text-yellow-400" : "text-red-400"
                    )}>
                      {item.status}
                    </span>
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      {item.elapsed}ms
                    </span>
                  </div>
                  <span className="truncate text-xs text-muted-foreground">
                    {item.url.replace(/^https?:\/\//, "")}
                  </span>
                </button>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
