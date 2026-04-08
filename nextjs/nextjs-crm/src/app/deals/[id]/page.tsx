import { deals, stageColors } from "@/lib/crm-data";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Building2,
  Mail,
  Calendar,
  DollarSign,
  Percent,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default async function DealDetailPage({ params }: IPageProps) {
  const { id } = await params;
  const deal = deals.find((d) => d.id === id);

  if (!deal) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            파이프라인
          </Link>
          <h1 className="text-xl font-bold">{deal.title}</h1>
          <span
            className={cn(
              "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
              stageColors[deal.stage]
            )}
          >
            {deal.stage}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 메인 정보 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 설명 */}
            <div className="rounded-xl border bg-background p-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">딜 상세</h2>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {deal.description}
              </p>
            </div>

            {/* 타임라인 */}
            <div className="rounded-xl border bg-background p-6">
              <h2 className="mb-4 text-lg font-semibold">활동 기록</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-medium">딜 생성</p>
                    <p className="text-xs text-muted-foreground">
                      {deal.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium">
                      {deal.contactName}님에게 제안서 발송
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deal.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-violet-500" />
                  <div>
                    <p className="text-sm font-medium">미팅 진행</p>
                    <p className="text-xs text-muted-foreground">
                      {deal.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 정보 */}
          <div className="space-y-6">
            {/* 딜 금액 */}
            <div className="rounded-xl border bg-background p-6">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                딜 정보
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    금액
                  </span>
                  <span className="font-medium">
                    {(deal.value / 10000).toLocaleString()}만원
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Percent className="h-4 w-4" />
                    성사 확률
                  </span>
                  <span className="font-medium">{deal.probability}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    생성일
                  </span>
                  <span className="font-medium">{deal.createdAt}</span>
                </div>
              </div>
            </div>

            {/* 연락처 */}
            <div className="rounded-xl border bg-background p-6">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                담당자
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {deal.contactName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{deal.contactName}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {deal.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {deal.contactEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
