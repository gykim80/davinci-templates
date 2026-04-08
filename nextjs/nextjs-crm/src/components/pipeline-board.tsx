import Link from "next/link";
import { cn } from "@/lib/utils";
import { stages, stageColors, type IDeal, type DealStage } from "@/lib/crm-data";
import { DollarSign, Percent, Building2 } from "lucide-react";

interface IPipelineBoardProps {
  deals: IDeal[];
}

function DealCard({ deal }: { deal: IDeal }) {
  return (
    <Link
      href={`/deals/${deal.id}`}
      className="block rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50"
    >
      <p className="font-medium">{deal.title}</p>
      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Building2 className="h-3.5 w-3.5" />
        {deal.company}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm font-medium">
          <DollarSign className="h-3.5 w-3.5" />
          {(deal.value / 10000).toLocaleString()}만원
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Percent className="h-3 w-3" />
          {deal.probability}%
        </span>
      </div>
    </Link>
  );
}

function StageColumn({ stage, deals }: { stage: DealStage; deals: IDeal[] }) {
  const stageDeals = deals.filter((d) => d.stage === stage);
  const total = stageDeals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex min-w-[280px] flex-1 flex-col">
      {/* 단계 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
              stageColors[stage]
            )}
          >
            {stage}
          </span>
          <span className="text-sm text-muted-foreground">
            {stageDeals.length}건
          </span>
        </div>
        <span className="text-sm font-medium">
          {(total / 10000).toLocaleString()}만원
        </span>
      </div>

      {/* 딜 카드 목록 */}
      <div className="flex flex-1 flex-col gap-3 rounded-xl border border-dashed bg-muted/30 p-3">
        {stageDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
        {stageDeals.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            딜이 없습니다
          </p>
        )}
      </div>
    </div>
  );
}

export function PipelineBoard({ deals }: IPipelineBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <StageColumn key={stage} stage={stage} deals={deals} />
      ))}
    </div>
  );
}
