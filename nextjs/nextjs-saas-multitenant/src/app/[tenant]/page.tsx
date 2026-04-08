import { getTenant } from "@/lib/tenant";
import { notFound } from "next/navigation";
import {
  Building2,
  Users,
  FileText,
  BarChart3,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IPageProps {
  params: Promise<{ tenant: string }>;
}

const quickStats = [
  { label: "팀원", value: "12명", icon: Users },
  { label: "문서", value: "148개", icon: FileText },
  { label: "이번 달 활동", value: "2,340", icon: BarChart3 },
];

export default async function TenantHomePage({ params }: IPageProps) {
  const { tenant: slug } = await params;
  const tenant = getTenant(slug);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 테넌트 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              {tenant.name[0]}
            </div>
            <div>
              <h1 className="text-sm font-bold">{tenant.name}</h1>
              <p className="text-xs text-muted-foreground">
                {tenant.slug}.example.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                tenant.plan === "enterprise" && "bg-amber-500/20 text-amber-400",
                tenant.plan === "pro" && "bg-blue-500/20 text-blue-400",
                tenant.plan === "free" && "bg-green-500/20 text-green-400"
              )}
            >
              {tenant.plan}
            </span>
            <Link
              href={`/${slug}/settings`}
              className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* 환영 배너 */}
        <div
          className="mb-8 rounded-2xl p-8 text-white"
          style={{ backgroundColor: tenant.primaryColor }}
        >
          <h2 className="mb-2 text-2xl font-bold">
            {tenant.name}에 오신 것을 환영합니다
          </h2>
          <p className="text-sm text-white/80">
            워크스페이스 생성일: {tenant.createdAt}
          </p>
        </div>

        {/* 통계 */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border p-6">
              <stat.icon className="mb-3 h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 빠른 작업 */}
        <h3 className="mb-4 text-lg font-semibold">빠른 작업</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "팀원 초대", desc: "새 팀원을 워크스페이스에 초대합니다", icon: Users },
            { title: "문서 만들기", desc: "새 문서를 생성하고 편집합니다", icon: FileText },
            { title: "워크스페이스 설정", desc: "도메인, 브랜드, 권한을 관리합니다", icon: Settings },
          ].map((action) => (
            <button
              key={action.title}
              className="flex items-start gap-4 rounded-xl border p-6 text-left transition-colors hover:bg-accent"
            >
              <action.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
