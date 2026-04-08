"use client";

import { FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IInvoice } from "./invoice-form";

const STATUS_LABELS = { draft: "초안", sent: "발송됨", paid: "결제완료" } as const;
const STATUS_COLORS = {
  draft: "bg-yellow-500/20 text-yellow-400",
  sent: "bg-blue-500/20 text-blue-400",
  paid: "bg-green-500/20 text-green-400",
};

interface IInvoiceListProps {
  invoices: IInvoice[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

/** 인보이스 목록 사이드바 */
export function InvoiceList({ invoices, selectedId, onSelect, onAdd }: IInvoiceListProps) {
  return (
    <aside className="flex h-full w-72 flex-col border-r bg-muted/30">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold">인보이스</h2>
        <button onClick={onAdd} className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent" title="새 인보이스">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {invoices.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <FileText className="mb-2 h-8 w-8" />
            <p className="text-xs">인보이스가 없습니다</p>
          </div>
        ) : (
          invoices.map((inv) => {
            const total = inv.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0) * 1.1;
            return (
              <button
                key={inv.id}
                onClick={() => onSelect(inv.id)}
                className={cn(
                  "w-full border-b px-4 py-3 text-left transition-colors hover:bg-accent/50",
                  selectedId === inv.id && "bg-accent"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">#{inv.invoiceNumber}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[inv.status]}`}>
                    {STATUS_LABELS[inv.status]}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{inv.clientName || "고객 미지정"}</p>
                <p className="mt-0.5 text-xs font-medium">{total.toLocaleString("ko-KR")}원</p>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
