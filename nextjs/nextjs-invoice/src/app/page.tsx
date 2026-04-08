"use client";

import { useState, useCallback } from "react";
import { FileText, Edit, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InvoiceList } from "@/components/invoice-list";
import { InvoiceForm, type IInvoice } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";

/** 샘플 인보이스 */
const SAMPLE_INVOICES: IInvoice[] = [
  {
    id: "1", invoiceNumber: "INV-001", clientName: "김철수", clientEmail: "kim@example.com",
    issueDate: "2025-03-01", dueDate: "2025-03-31", notes: "30일 내 입금 부탁드립니다.",
    status: "sent",
    items: [
      { id: "a", description: "웹사이트 디자인", quantity: 1, unitPrice: 3000000 },
      { id: "b", description: "프론트엔드 개발", quantity: 1, unitPrice: 5000000 },
    ],
  },
  {
    id: "2", invoiceNumber: "INV-002", clientName: "이영희", clientEmail: "lee@example.com",
    issueDate: "2025-03-15", dueDate: "2025-04-15", notes: "",
    status: "draft",
    items: [
      { id: "c", description: "컨설팅 (시간당)", quantity: 10, unitPrice: 200000 },
    ],
  },
];

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<IInvoice[]>(SAMPLE_INVOICES);
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  const selected = invoices.find((inv) => inv.id === selectedId) ?? null;

  // 새 인보이스
  const addInvoice = useCallback(() => {
    const num = String(invoices.length + 1).padStart(3, "0");
    const newInv: IInvoice = {
      id: crypto.randomUUID(), invoiceNumber: `INV-${num}`,
      clientName: "", clientEmail: "",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: "", notes: "", status: "draft",
      items: [{ id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 }],
    };
    setInvoices((prev) => [newInv, ...prev]);
    setSelectedId(newInv.id);
    setViewMode("edit");
  }, [invoices.length]);

  // 인보이스 업데이트
  const updateInvoice = useCallback(
    (updates: Partial<IInvoice>) => {
      if (!selectedId) return;
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === selectedId ? { ...inv, ...updates } : inv))
      );
    },
    [selectedId]
  );

  return (
    <div className="flex h-screen bg-background">
      <InvoiceList invoices={invoices} selectedId={selectedId} onSelect={setSelectedId} onAdd={addInvoice} />

      <main className="flex flex-1 flex-col">
        {selected ? (
          <>
            {/* 뷰 모드 토글 */}
            <div className="flex items-center gap-2 border-b px-6 py-3">
              <Button variant={viewMode === "edit" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("edit")}
                className="flex items-center gap-1.5">
                <Edit className="h-3.5 w-3.5" /> 편집
              </Button>
              <Button variant={viewMode === "preview" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("preview")}
                className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> 미리보기
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mx-auto max-w-2xl">
                {viewMode === "edit" ? (
                  <InvoiceForm invoice={selected} onChange={updateInvoice} />
                ) : (
                  <InvoicePreview invoice={selected} />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <FileText className="mb-4 h-12 w-12" />
            <p className="text-lg">인보이스를 선택하세요</p>
            <p className="text-sm">또는 새 인보이스를 만들어보세요</p>
          </div>
        )}
      </main>
    </div>
  );
}
