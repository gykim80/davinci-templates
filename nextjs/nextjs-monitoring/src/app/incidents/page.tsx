import { incidents, severityConfig } from "@/lib/monitor-data";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search as SearchIcon,
} from "lucide-react";
import Link from "next/link";

export default function IncidentsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            모니터링
          </Link>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">인시던트</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <p className="mb-6 text-muted-foreground">
          총 {incidents.length}건의 인시던트
        </p>

        {/* 타임라인 */}
        <div className="relative">
          {/* 세로선 */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-border" />

          <div className="space-y-6">
            {incidents.map((incident) => (
              <div key={incident.id} className="relative flex gap-4 pl-12">
                {/* 타임라인 아이콘 */}
                <div className="absolute left-0 top-1">
                  {incident.status === "해결됨" ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  ) : incident.severity === "심각" ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                      <SearchIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                  )}
                </div>

                {/* 인시던트 카드 */}
                <div className="flex-1 rounded-xl border bg-background p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        severityConfig[incident.severity]
                      )}
                    >
                      {incident.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {incident.serviceName}
                    </span>
                    <span
                      className={cn(
                        "ml-auto text-xs font-medium",
                        incident.status === "해결됨"
                          ? "text-emerald-500"
                          : incident.status === "진행중"
                            ? "text-red-500"
                            : "text-yellow-500"
                      )}
                    >
                      {incident.status}
                    </span>
                  </div>

                  <h3 className="mb-2 font-semibold">{incident.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    {incident.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      발생: {incident.startedAt.replace("T", " ")}
                    </span>
                    {incident.resolvedAt && (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        해결: {incident.resolvedAt.replace("T", " ")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
