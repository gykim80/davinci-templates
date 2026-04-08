"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Search, Star, ShoppingCart, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { digitalProducts, productTypes, formatPrice, type ProductType } from "@/lib/digital-products";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<ProductType | "all">("all");

  const filtered = digitalProducts.filter((p) => {
    const matchesType = selectedType === "all" || p.type === selectedType;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">디지털 상품</span>
          </Link>
          <Link href="/library" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <BookOpen className="h-4 w-4" /> 내 라이브러리
          </Link>
        </div>
      </header>

      {/* 히어로 + 검색 */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">프리미엄 디지털 상품</h1>
          <p className="mb-6 text-muted-foreground">템플릿, 이북, 강좌, 플러그인 등 고품질 디지털 상품을 만나보세요.</p>
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-xl border bg-background px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="상품 검색..." className="flex-1 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0" />
          </div>
        </div>
      </section>

      {/* 타입 필터 */}
      <section className="border-b py-4">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4">
          {productTypes.map((t) => (
            <Button key={t.value} variant={selectedType === t.value ? "default" : "outline"} size="sm" onClick={() => setSelectedType(t.value)} className="shrink-0 rounded-full">
              {t.label}
            </Button>
          ))}
        </div>
      </section>

      {/* 상품 그리드 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-6 text-sm text-muted-foreground">{filtered.length}개의 상품</p>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-muted-foreground">
              <Search className="mb-4 h-12 w-12" />
              <p>검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="flex h-40 items-center justify-center bg-muted text-5xl">{product.image}</div>
                  <CardContent className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{productTypes.find((t) => t.value === product.type)?.label}</Badge>
                      <span className="text-xs text-muted-foreground">{product.fileSize}</span>
                    </div>
                    <h3 className="font-medium group-hover:text-primary">{product.name}</h3>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating} ({product.reviewCount})</span>
                      <span className="text-xs text-muted-foreground">· {product.downloadCount.toLocaleString()} 다운로드</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                      {product.purchased ? (
                        <span className="flex items-center gap-1 text-xs text-green-500"><Download className="h-3 w-3" />구매완료</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><ShoppingCart className="h-3 w-3" />구매하기</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 디지털 상품. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
