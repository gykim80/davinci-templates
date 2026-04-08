"use client";

import { Plus, Trash2 } from "lucide-react";

/** 라인 아이템 타입 */
export interface ILineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

/** 인보이스 타입 */
export interface IInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  items: ILineItem[];
  notes: string;
  status: "draft" | "sent" | "paid";
}

interface IInvoiceFormProps {
  invoice: IInvoice;
  onChange: (updates: Partial<IInvoice>) => void;
}

/** 인보이스 작성 폼 */
export function InvoiceForm({ invoice, onChange }: IInvoiceFormProps) {
  // 라인 아이템 추가
  const addItem = () => {
    const newItem: ILineItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    onChange({ items: [...invoice.items, newItem] });
  };

  // 라인 아이템 수정
  const updateItem = (id: string, updates: Partial<ILineItem>) => {
    onChange({
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  // 라인 아이템 삭제
  const removeItem = (id: string) => {
    onChange({ items: invoice.items.filter((item) => item.id !== id) });
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">인보이스 번호</label>
          <input value={invoice.invoiceNumber} onChange={(e) => onChange({ invoiceNumber: e.target.value })}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">상태</label>
          <select value={invoice.status} onChange={(e) => onChange({ status: e.target.value as IInvoice["status"] })}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
            <option value="draft">초안</option>
            <option value="sent">발송됨</option>
            <option value="paid">결제완료</option>
          </select>
        </div>
      </div>

      {/* 고객 정보 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">고객명</label>
          <input value={invoice.clientName} onChange={(e) => onChange({ clientName: e.target.value })}
            placeholder="고객 이름" className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">이메일</label>
          <input value={invoice.clientEmail} onChange={(e) => onChange({ clientEmail: e.target.value })}
            placeholder="client@example.com" className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">발행일</label>
          <input type="date" value={invoice.issueDate} onChange={(e) => onChange({ issueDate: e.target.value })}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">만기일</label>
          <input type="date" value={invoice.dueDate} onChange={(e) => onChange({ dueDate: e.target.value })}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      {/* 라인 아이템 */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">항목</label>
          <button onClick={addItem} className="flex items-center gap-1 text-xs text-primary hover:underline">
            <Plus className="h-3 w-3" /> 항목 추가
          </button>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_80px_100px_32px] gap-2 text-[10px] font-medium text-muted-foreground">
            <span>설명</span><span>수량</span><span>단가 (원)</span><span />
          </div>
          {invoice.items.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_80px_100px_32px] gap-2">
              <input value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })}
                placeholder="항목 설명" className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring" />
              <input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring" />
              <input type="number" min={0} value={item.unitPrice} onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                className="rounded-md border bg-background px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring" />
              <button onClick={() => removeItem(item.id)} className="flex items-center justify-center text-muted-foreground hover:text-red-400">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* 합계 */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">소계</span>
            <span>{subtotal.toLocaleString("ko-KR")}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">부가세 (10%)</span>
            <span>{tax.toLocaleString("ko-KR")}원</span>
          </div>
          <div className="flex justify-between border-t pt-1 font-semibold">
            <span>합계</span>
            <span>{total.toLocaleString("ko-KR")}원</span>
          </div>
        </div>
      </div>

      {/* 비고 */}
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">비고</label>
        <textarea value={invoice.notes} onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="추가 메모..." rows={2}
          className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
    </div>
  );
}
