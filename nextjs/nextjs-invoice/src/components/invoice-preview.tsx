"use client";

import { Printer } from "lucide-react";
import type { IInvoice } from "./invoice-form";

interface IInvoicePreviewProps {
  invoice: IInvoice;
}

/** 인보이스 미리보기 (인쇄용) */
export function InvoicePreview({ invoice }: IInvoicePreviewProps) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const STATUS_LABELS = { draft: "초안", sent: "발송됨", paid: "결제완료" };
  const STATUS_COLORS = {
    draft: "bg-yellow-500/20 text-yellow-400",
    sent: "bg-blue-500/20 text-blue-400",
    paid: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="flex flex-col">
      {/* 인쇄 버튼 */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          <Printer className="h-4 w-4" /> 인쇄 / PDF
        </button>
      </div>

      {/* 미리보기 카드 */}
      <div className="rounded-xl border bg-background p-8 shadow-sm print:shadow-none">
        {/* 헤더 */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">인보이스</h2>
            <p className="mt-1 text-sm text-muted-foreground">#{invoice.invoiceNumber}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[invoice.status]}`}>
            {STATUS_LABELS[invoice.status]}
          </span>
        </div>

        {/* 발신/수신 */}
        <div className="mb-8 grid grid-cols-2 gap-8">
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">발신</p>
            <p className="text-sm font-medium">내 회사</p>
            <p className="text-xs text-muted-foreground">info@mycompany.kr</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">수신</p>
            <p className="text-sm font-medium">{invoice.clientName || "—"}</p>
            <p className="text-xs text-muted-foreground">{invoice.clientEmail || "—"}</p>
          </div>
        </div>

        {/* 날짜 */}
        <div className="mb-8 grid grid-cols-2 gap-8 text-sm">
          <div>
            <span className="text-xs text-muted-foreground">발행일: </span>
            <span>{invoice.issueDate || "—"}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">만기일: </span>
            <span>{invoice.dueDate || "—"}</span>
          </div>
        </div>

        {/* 항목 테이블 */}
        <table className="mb-6 w-full text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="pb-2 text-left font-medium">항목</th>
              <th className="pb-2 text-right font-medium">수량</th>
              <th className="pb-2 text-right font-medium">단가</th>
              <th className="pb-2 text-right font-medium">금액</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.description || "—"}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{item.unitPrice.toLocaleString("ko-KR")}원</td>
                <td className="py-2 text-right font-medium">
                  {(item.quantity * item.unitPrice).toLocaleString("ko-KR")}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 합계 */}
        <div className="flex justify-end">
          <div className="w-60 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">소계</span>
              <span>{subtotal.toLocaleString("ko-KR")}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">부가세 (10%)</span>
              <span>{tax.toLocaleString("ko-KR")}원</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>합계</span>
              <span>{total.toLocaleString("ko-KR")}원</span>
            </div>
          </div>
        </div>

        {/* 비고 */}
        {invoice.notes && (
          <div className="mt-8 rounded-lg bg-muted/30 p-4">
            <p className="mb-1 text-xs font-medium text-muted-foreground">비고</p>
            <p className="text-sm">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
