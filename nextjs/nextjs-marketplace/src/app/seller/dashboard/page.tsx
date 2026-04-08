"use client";

import Link from "next/link";
import { Store, Package, DollarSign, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sellers, getProductsBySeller, formatPrice } from "@/lib/marketplace-data";

// 데모: 첫 번째 판매자를 현재 사용자로 가정
const currentSeller = sellers[0];
const myProducts = getProductsBySeller(currentSeller.id);

const stats = [
  { label: "총 매출", value: "₩12,480,000", change: "+12.5%", up: true, icon: DollarSign },
  { label: "이번 달 주문", value: "156건", change: "+8.2%", up: true, icon: ShoppingCart },
  { label: "등록 상품", value: `${myProducts.length}개`, change: "0%", up: true, icon: Package },
  { label: "평균 평점", value: `${currentSeller.rating}`, change: "+0.1", up: true, icon: TrendingUp },
];

const recentOrders = [
  { id: "ORD-001", product: "수제 가죽 노트북 파우치", buyer: "김민수", amount: 68000, status: "배송중", date: "2026-03-30" },
  { id: "ORD-002", product: "손뜨개 울 비니", buyer: "이서연", amount: 42000, status: "준비중", date: "2026-03-30" },
  { id: "ORD-003", product: "수제 가죽 노트북 파우치", buyer: "박지호", amount: 68000, status: "완료", date: "2026-03-29" },
  { id: "ORD-004", product: "손뜨개 울 비니", buyer: "최유나", amount: 42000, status: "완료", date: "2026-03-28" },
  { id: "ORD-005", product: "수제 가죽 노트북 파우치", buyer: "정다은", amount: 68000, status: "완료", date: "2026-03-27" },
];

export default function SellerDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">마켓</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/seller/dashboard" className="font-medium text-foreground">대시보드</Link>
            <Link href="/seller/products" className="text-muted-foreground hover:text-foreground">상품관리</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">판매자 대시보드</h1>
          <p className="mt-1 text-sm text-muted-foreground">안녕하세요, {currentSeller.name}님</p>
        </div>

        {/* 통계 카드 */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={cn("mt-1 flex items-center gap-1 text-xs", stat.up ? "text-green-500" : "text-red-500")}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change} 전월 대비
              </div>
            </div>
          ))}
        </div>

        {/* 최근 주문 */}
        <div className="rounded-xl border">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">최근 주문</h2>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="divide-y">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{order.product}</span>
                  <span className="text-xs text-muted-foreground">{order.id} · {order.buyer} · {order.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", order.status === "완료" ? "bg-green-500/10 text-green-500" : order.status === "배송중" ? "bg-blue-500/10 text-blue-500" : "bg-yellow-500/10 text-yellow-500")}>
                    {order.status}
                  </span>
                  <span className="text-sm font-medium">{formatPrice(order.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
