import { services, incidents } from "@/lib/monitor-data";
import { StatusBadge } from "@/components/status-badge";
import {
  ArrowLeft,
  Globe,
  Clock,
  Zap,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IPageProps {
  params: Promise<{ id: string }>;
}

function ResponseTimeChart({ data }: { data: number[] }) {
  const height = 200;
  const width = 700;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const filtered = data.filter((v) => v > 0);
  const maxValue = Math.max(...filtered);
  const minValue = Math.min(...filtered);
  const valueRange = maxValue - minValue || 1;

  const points = data.map((v, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: v === 0
      ? padding.top + chartHeight
      : padding.top + chartHeight - ((v - minValue) / valueRange) * chartHeight,
    value: v,
  }));

  const linePath = points
    .filter((p) => p.value > 0)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const yTicks = [minValue, Math.round((minValue + maxValue) / 2), maxValue];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {yTicks.map((tick) => {
        const y = padding.top + chartHeight - ((tick - minValue) / valueRange) * chartHeight;
        return (
          <g key={tick}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="hsl(var(--border))" strokeDasharray="4 4" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">{tick}ms</text>
          </g>
        );
      })}
      {[0, 6, 12, 18, 23].map((i) => (
        <text key={i} x={points[i]?.x ?? 0} y={height - 5} textAnchor="middle" className="fill-muted-foreground text-[10px]">{i}시</text>
      ))}
      <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.filter((p) => p.value > 0).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default async function ServiceDetailPage({ params }: IPageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) notFound();
  const serviceIncidents = incidents.filter((i) => i.serviceId === service.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            모니터링
          </Link>
          <h1 className="text-xl font-bold">{service.name}</h1>
          <StatusBadge status={service.status} />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* 메트릭 카드 */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />업타임
            </div>
            <p className="mt-2 text-2xl font-bold">{service.uptime}%</p>
          </div>
          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />응답시간
            </div>
            <p className="mt-2 text-2xl font-bold">{service.responseTime}ms</p>
          </div>
          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />URL
            </div>
            <p className="mt-2 truncate text-sm font-medium">{service.url}</p>
          </div>
          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />인시던트
            </div>
            <p className="mt-2 text-2xl font-bold">{serviceIncidents.length}건</p>
          </div>
        </div>

        {/* 응답시간 차트 */}
        <div className="mb-8 rounded-xl border bg-background p-6">
          <h2 className="mb-4 text-lg font-semibold">24시간 응답시간 추이 (ms)</h2>
          <ResponseTimeChart data={service.responseHistory} />
        </div>

        {/* 관련 인시던트 */}
        {serviceIncidents.length > 0 && (
          <div className="rounded-xl border bg-background">
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">관련 인시던트</h2>
            </div>
            <div className="divide-y">
              {serviceIncidents.map((incident) => (
                <div key={incident.id} className="px-6 py-4">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-medium">{incident.title}</p>
                    <span className="text-xs text-muted-foreground">{incident.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
