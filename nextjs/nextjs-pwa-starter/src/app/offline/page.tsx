import { WifiOff } from "lucide-react";

// 오프라인 페이지 — 네트워크 연결 없을 때 표시
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">오프라인 상태입니다</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        인터넷 연결을 확인하고 다시 시도해 주세요.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        다시 시도
      </button>
    </div>
  );
}
