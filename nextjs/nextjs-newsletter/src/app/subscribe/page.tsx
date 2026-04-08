import Link from "next/link";
import { CheckCircle, ArrowLeft, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubscribeConfirmPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">뉴스레터</span>
          </div>
        </div>
      </header>

      {/* 확인 메시지 */}
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
        <h1 className="mb-3 text-2xl font-bold">구독이 완료되었습니다!</h1>
        <p className="mb-8 text-muted-foreground">
          매주 최신 기술 뉴스레터를 이메일로 받아보실 수 있습니다.
          <br />
          첫 번째 뉴스레터가 곧 발송됩니다.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl",
              "bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
              "transition-colors hover:bg-primary/90"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
          <Link
            href="/archive"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border",
              "px-5 py-2.5 text-sm transition-colors hover:bg-accent"
            )}
          >
            이전 뉴스레터 보기
          </Link>
        </div>
      </main>
    </div>
  );
}
