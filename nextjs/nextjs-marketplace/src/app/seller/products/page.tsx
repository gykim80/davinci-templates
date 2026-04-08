"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, Plus, Edit, Trash2, Star, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { sellers, getProductsBySeller, formatPrice } from "@/lib/marketplace-data";

const currentSeller = sellers[0];

export default function SellerProductsPage() {
  const [products, setProducts] = useState(getProductsBySeller(currentSeller.id));

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">마켓</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/seller/dashboard" className="text-muted-foreground hover:text-foreground">대시보드</Link>
            <Link href="/seller/products" className="font-medium text-foreground">상품관리</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">상품 관리</h1>
            <p className="mt-1 text-sm text-muted-foreground">{products.length}개의 등록 상품</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            상품 등록
          </button>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <Package className="mb-4 h-12 w-12" />
            <p className="mb-2 text-lg">등록된 상품이 없습니다</p>
            <p className="text-sm">첫 번째 상품을 등록해보세요</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 rounded-xl border p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted text-3xl">
                  {product.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{product.category}</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </span>
                    <span>{product.reviewCount}개 리뷰</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPrice(product.price)}</div>
                  {product.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="rounded-lg border p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
