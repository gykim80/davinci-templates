"use client";

import { useState } from "react";
import { Play, Code2, ChevronDown, Terminal, RotateCcw } from "lucide-react";

// 샘플 코드 스니펫
const SNIPPETS = [
  { label: "Hello World", code: 'console.log("Hello, World!");' },
  { label: "Fibonacci", code: 'function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\nconsole.log(fib(10));' },
  { label: "Array Map", code: 'const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);' },
  { label: "Fetch Mock", code: 'async function fetchData() {\n  // 시뮬레이션\n  return { status: 200, data: "OK" };\n}\nfetchData().then(console.log);' },
];

export default function PlaygroundPage() {
  const [code, setCode] = useState(SNIPPETS[0].code);
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // 코드 실행 (console.log 캡처)
  const handleRun = () => {
    setRunning(true);
    setOutput([]);
    setTimeout(() => {
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.map(String).join(" "));
      try {
        // eslint-disable-next-line no-new-func
        new Function(code)();
        setOutput(logs.length ? logs : ["(실행 완료 - 출력 없음)"]);
      } catch (err) {
        setOutput([`Error: ${(err as Error).message}`]);
      } finally {
        console.log = originalLog;
        setRunning(false);
      }
    }, 300);
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">Playground</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* 스니펫 드롭다운 */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm hover:bg-accent transition-colors"
            >
              Snippets <ChevronDown className="w-3 h-3" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
                {SNIPPETS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => { setCode(s.code); setOutput([]); setShowDropdown(false); }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => { setCode(""); setOutput([]); }} className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Clear">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 스플릿 패인 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)] min-h-[400px]">
        {/* 코드 입력 */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border text-xs text-muted-foreground">
            <Code2 className="w-3 h-3" /> JavaScript
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-card text-foreground font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
            placeholder="// 코드를 입력하세요..."
          />
          <div className="flex justify-end p-2 bg-muted/50 border-t border-border">
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {running ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        {/* 출력 */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border text-xs text-muted-foreground">
            <Terminal className="w-3 h-3" /> Output
          </div>
          <div className="flex-1 p-4 bg-card overflow-auto font-mono text-sm">
            {output.length === 0 ? (
              <span className="text-muted-foreground">// Run 버튼을 눌러 결과를 확인하세요</span>
            ) : (
              output.map((line, i) => (
                <div key={i} className={`py-0.5 ${line.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
