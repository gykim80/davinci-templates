import { deals } from "@/lib/crm-data";
import { PipelineBoard } from "@/components/pipeline-board";
import { Briefcase, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CRMPage() {
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const activeDeals = deals.filter((d) => d.stage !== "완료").length;

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CRM</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contacts"
              className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <Users className="h-4 w-4" />
              연락처
            </Link>
            <Button>
              새 딜 추가
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 요약 카드 */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">총 파이프라인 금액</p>
              <p className="mt-2 text-2xl font-bold">
                ₩{(totalValue / 100000000).toFixed(1)}억
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">활성 딜</p>
              <p className="mt-2 text-2xl font-bold">{activeDeals}건</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">평균 딜 금액</p>
              <p className="mt-2 text-2xl font-bold">
                {(totalValue / deals.length / 10000).toLocaleString()}만원
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 파이프라인 보드 */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold">파이프라인</h2>
          <PipelineBoard deals={deals} />
        </div>
      </main>
    </div>
  );
}
