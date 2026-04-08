import { services, incidents, severityConfig } from "@/lib/monitor-data";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Server,
  AlertTriangle,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function MonitoringPage() {
  const healthyCount = services.filter((s) => s.status === "정상").length;
  const avgUptime =
    services.reduce((sum, s) => sum + s.uptime, 0) / services.length;
  const activeIncidents = incidents.filter(
    (i) => i.status !== "해결됨"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">모니터링</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild>
              <Link href="/incidents" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                인시던트
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 요약 카드 */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Server className="h-4 w-4" />
                서비스 상태
              </div>
              <p className="mt-2 text-2xl font-bold">
                {healthyCount}/{services.length}{" "}
                <span className="text-sm font-normal text-emerald-500">정상</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                평균 업타임
              </div>
              <p className="mt-2 text-2xl font-bold">{avgUptime.toFixed(2)}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                활성 인시던트
              </div>
              <p className="mt-2 text-2xl font-bold">
                {activeIncidents}건
                {activeIncidents > 0 && (
                  <span className="ml-2 text-sm font-normal text-red-500">
                    주의 필요
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 서비스 상태 목록 */}
        <Card className="mb-8">
          <CardHeader className="flex-row items-center gap-2 border-b px-6 py-4">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">서비스 현황</CardTitle>
          </CardHeader>
          <div className="divide-y">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <StatusBadge status={service.status} />
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm font-medium">{service.uptime}%</p>
                    <p className="text-xs text-muted-foreground">업타임</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {service.responseTime}ms
                    </p>
                    <p className="text-xs text-muted-foreground">응답시간</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* 최근 인시던트 */}
        <Card>
          <CardHeader className="flex-row items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">최근 인시던트</CardTitle>
            </div>
            <Link
              href="/incidents"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              전체 보기
            </Link>
          </CardHeader>
          <div className="divide-y">
            {incidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="px-6 py-4">
                <div className="mb-2 flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full",
                      severityConfig[incident.severity]
                    )}
                  >
                    {incident.severity}
                  </Badge>
                  <p className="font-medium">{incident.title}</p>
                  <span
                    className={cn(
                      "ml-auto text-xs",
                      incident.status === "해결됨"
                        ? "text-emerald-500"
                        : "text-yellow-500"
                    )}
                  >
                    {incident.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {incident.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {incident.startedAt.replace("T", " ")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
