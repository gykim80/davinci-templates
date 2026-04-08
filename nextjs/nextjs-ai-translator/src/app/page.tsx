"use client";

import {
  Languages,
  ArrowRightLeft,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/languages";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("ko");
  const [targetLang, setTargetLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const translate = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setTranslatedText("");
        return;
      }
      setIsTranslating(true);
      setError("");

      try {
        const sourceName = LANGUAGES.find((l) => l.code === sourceLang)?.name || sourceLang;
        const targetName = LANGUAGES.find((l) => l.code === targetLang)?.name || targetLang;

        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            sourceLanguage: sourceName,
            targetLanguage: targetName,
          }),
        });
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setTranslatedText(data.translation);
        }
      } catch {
        setError("번역 중 오류가 발생했습니다.");
      } finally {
        setIsTranslating(false);
      }
    },
    [sourceLang, targetLang]
  );

  const handleSwap = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  }, [sourceLang, targetLang, sourceText, translatedText]);

  const handleCopy = useCallback(async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [translatedText]);

  // 디바운스 번역 (800ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      translate(sourceText);
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [sourceText, sourceLang, targetLang, translate]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Languages className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">AI 번역기</h1>
      </header>

      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* 소스 언어 패널 */}
        <div className="flex flex-1 flex-col border-b md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <Select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="rounded-lg"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </Select>
          </div>
          <Textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="번역할 텍스트를 입력하세요..."
            className="flex-1 resize-none border-0 bg-transparent p-4 text-base shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center gap-2 border-t px-4 py-2">
            <span className="text-xs text-muted-foreground">
              {sourceText.length}자
            </span>
            {sourceText && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSourceText("");
                  setTranslatedText("");
                }}
                className="ml-auto text-xs"
              >
                지우기
              </Button>
            )}
          </div>
        </div>

        {/* 스왑 버튼 (가운데) */}
        <div className="flex items-center justify-center py-2 md:py-0">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="rounded-full"
            title="언어 스왑"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* 타겟 언어 패널 */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <Select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="rounded-lg"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </Select>
            {isTranslating && (
              <Loader2 className="ml-auto h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
          <div className="relative flex-1">
            <div
              className={cn(
                "h-full overflow-y-auto p-4 text-base",
                !translatedText && "text-muted-foreground"
              )}
            >
              {error ? (
                <p className="text-red-400">{error}</p>
              ) : translatedText ? (
                <p className="whitespace-pre-wrap">{translatedText}</p>
              ) : isTranslating ? (
                <p>번역 중...</p>
              ) : (
                <p>번역 결과가 여기에 표시됩니다</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 border-t px-4 py-2">
            <span className="text-xs text-muted-foreground">
              {translatedText.length}자
            </span>
            <div className="ml-auto flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!translatedText}
                className="text-xs"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "복사됨" : "복사"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* 하단 상태 바 */}
      <footer className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
        <span>GPT-4o-mini 기반 번역</span>
        <span>7개 언어 지원 | 자동 번역 (800ms 디바운스)</span>
      </footer>
    </div>
  );
}
