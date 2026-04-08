"use client";

import Link from "next/link";
import { usePwa } from "@/lib/use-pwa";
import { cn } from "@/lib/utils";
import {
  Wifi,
  WifiOff,
  Download,
  Bell,
  BellOff,
  Shield,
  Settings,
  Home,
  Compass,
  User,
  CheckCircle2,
  XCircle,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 상태 배지 컴포넌트
function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs">
      {active ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
      )}
      <span className={active ? "text-green-400" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  );
}

export default function PwaHomePage() {
  const {
    isOnline,
    isInstallable,
    isInstalled,
    swRegistered,
    notificationPermission,
    install,
    requestNotification,
  } = usePwa();

  // 하단 네비게이션 항목
  const navItems = [
    { icon: Home, label: "홈", href: "/", active: true },
    { icon: Compass, label: "탐색", href: "#", active: false },
    { icon: User, label: "프로필", href: "#", active: false },
    { icon: Settings, label: "설정", href: "/settings", active: false },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-16">
      {/* 오프라인 배너 */}
      {!isOnline && (
        <div className="flex items-center justify-center gap-2 bg-yellow-500/20 px-4 py-2 text-sm text-yellow-400">
          <WifiOff className="h-4 w-4" />
          오프라인 모드입니다
        </div>
      )}

      {/* 헤더 */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">PWA Starter</h1>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-400" />
          ) : (
            <WifiOff className="h-4 w-4 text-yellow-400" />
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg space-y-6 px-4 py-6">
        {/* 환영 카드 */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">PWA 스타터에 오신 것을 환영합니다</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              이 앱은 Progressive Web App으로, 오프라인에서도 작동하며
              홈 화면에 설치할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* PWA 상태 대시보드 */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5 text-primary" />
              PWA 상태
            </h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge active={isOnline} label={isOnline ? "온라인" : "오프라인"} />
              <StatusBadge active={swRegistered} label="서비스 워커" />
              <StatusBadge active={isInstalled} label="설치됨" />
              <StatusBadge
                active={notificationPermission === "granted"}
                label="알림 권한"
              />
            </div>
          </CardContent>
        </Card>

        {/* 설치 프롬프트 */}
        {isInstallable && !isInstalled && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Download className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">앱 설치</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                홈 화면에 앱을 설치하면 더 빠르게 접근할 수 있습니다.
              </p>
              <Button onClick={install}>
                <Download className="h-4 w-4" />
                설치하기
              </Button>
            </CardContent>
          </Card>
        )}

        {isInstalled && (
          <Card className="bg-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <div>
                  <h3 className="font-semibold text-green-400">앱이 설치되었습니다</h3>
                  <p className="text-sm text-muted-foreground">
                    홈 화면에서 앱을 실행할 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 알림 권한 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              {notificationPermission === "granted" ? (
                <Bell className="h-5 w-5 text-primary" />
              ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
              )}
              <h3 className="text-lg font-semibold">푸시 알림</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {notificationPermission === "granted"
                ? "알림이 활성화되어 있습니다."
                : notificationPermission === "denied"
                ? "알림이 차단되어 있습니다. 브라우저 설정에서 변경해 주세요."
                : "알림을 허용하면 중요한 업데이트를 받을 수 있습니다."}
            </p>
            {notificationPermission === "default" && (
              <Button variant="outline" onClick={requestNotification}>
                <Bell className="h-4 w-4" />
                알림 허용
              </Button>
            )}
          </CardContent>
        </Card>

        {/* 기능 카드 */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Wifi, title: "오프라인 지원", desc: "네트워크 없이도 작동" },
            { icon: Download, title: "설치 가능", desc: "홈 화면에 추가" },
            { icon: Bell, title: "푸시 알림", desc: "실시간 업데이트" },
            { icon: Shield, title: "안전한 연결", desc: "HTTPS 보안" },
          ].map((feat) => (
            <Card key={feat.title}>
              <CardContent className="p-4">
                <feat.icon className="mb-2 h-6 w-6 text-primary" />
                <h4 className="text-sm font-semibold">{feat.title}</h4>
                <p className="text-xs text-muted-foreground">{feat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 하단 네비게이션 (앱처럼) */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background px-2 py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 text-xs transition-colors",
              item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
