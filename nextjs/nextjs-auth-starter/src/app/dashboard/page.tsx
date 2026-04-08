"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import {
  LogOut,
  Shield,
  User,
  Mail,
  Key,
  Clock,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { user, token, isLoading, logout } = useAuth();
  const router = useRouter();

  // 미인증 사용자 리다이렉트
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 토큰 디코딩하여 페이로드 표시
  const tokenPayload = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">대시보드</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        {/* 환영 메시지 */}
        <div className="rounded-2xl border bg-muted/30 p-6">
          <h2 className="text-xl font-bold">
            안녕하세요, {user.name}님!
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            보호된 대시보드에 접근하셨습니다. 이 페이지는 인증된
            사용자만 볼 수 있습니다.
          </p>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="rounded-2xl border p-6">
          <h3 className="mb-4 text-lg font-semibold">사용자 정보</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">이름:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">이메일:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Key className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono font-medium">{user.id}</span>
            </div>
          </div>
        </div>

        {/* JWT 토큰 표시 */}
        {tokenPayload && (
          <div className="rounded-2xl border p-6">
            <h3 className="mb-4 text-lg font-semibold">
              JWT 토큰 페이로드
            </h3>
            <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-xs leading-relaxed">
              {JSON.stringify(tokenPayload, null, 2)}
            </pre>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                만료:{" "}
                {new Date(tokenPayload.exp).toLocaleString("ko-KR")}
              </span>
            </div>
          </div>
        )}

        {/* Raw 토큰 */}
        {token && (
          <div className="rounded-2xl border p-6">
            <h3 className="mb-4 text-lg font-semibold">Raw Token</h3>
            <p className="break-all rounded-xl bg-muted p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              {token}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
