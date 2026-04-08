"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categories,
  filterProducts,
} from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const sortOptions = [
  { value: "default", label: "추천순" },
  { value: "price-asc", label: "가격 낮은순" },
  { value: "price-desc", label: "가격 높은순" },
  { value: "rating", label: "평점순" },
  { value: "reviews", label: "리뷰 많은순" },
];

const priceRanges = [
  { label: "전체", min: undefined, max: undefined },
  { label: "₩30,000 이하", min: undefined, max: 30000 },
  { label: "₩30,000 ~ ₩100,000", min: 30000, max: 100000 },
  { label: "₩100,000 이상", min: 100000, max: undefined },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("default");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const range = priceRanges[selectedPriceRange];
  const filtered = filterProducts(
    selectedCategory,
    selectedSort,
    range.min,
    range.max
  );

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">스토어</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-4 w-4" />
            장바구니
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 페이지 타이틀 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">상품 목록</h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length}개의 상품</p>
          </div>
          <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm md:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            필터
          </button>
        </div>

        <div className="flex gap-8">
          {/* 사이드바 필터 */}
          <aside className={cn("w-full shrink-0 md:block md:w-56", showFilter ? "fixed inset-0 z-50 overflow-y-auto bg-background p-6 md:relative md:p-0" : "hidden")}>
            <div className="mb-4 flex items-center justify-between md:hidden">
              <h2 className="text-lg font-bold">필터</h2>
              <button onClick={() => setShowFilter(false)}><X className="h-5 w-5" /></button>
            </div>
            {/* 카테고리 */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold">카테고리</h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); setShowFilter(false); }} className={cn("rounded-lg px-3 py-2 text-left text-sm transition-colors", selectedCategory === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* 가격대 */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold">가격대</h3>
              <div className="flex flex-col gap-1">
                {priceRanges.map((r, i) => (
                  <button key={r.label} onClick={() => { setSelectedPriceRange(i); setShowFilter(false); }} className={cn("rounded-lg px-3 py-2 text-left text-sm transition-colors", selectedPriceRange === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            {/* 정렬 */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">정렬</h3>
              <div className="flex flex-col gap-1">
                {sortOptions.map((opt) => (
                  <button key={opt.value} onClick={() => { setSelectedSort(opt.value); setShowFilter(false); }} className={cn("rounded-lg px-3 py-2 text-left text-sm transition-colors", selectedSort === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 상품 그리드 */}
          <div className="flex-1">
            <div className="mb-4 hidden items-center justify-end md:flex">
              <div className="relative">
                <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="appearance-none rounded-lg border bg-background px-3 py-2 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring">
                  {sortOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-muted-foreground">
                <ShoppingBag className="mb-4 h-12 w-12" />
                <p>조건에 맞는 상품이 없습니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
