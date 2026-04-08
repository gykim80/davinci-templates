import Link from "next/link";
import { Store, ArrowRight, Star, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  marketProducts,
  marketCategories,
  sellers,
  formatPrice,
  getSellerById,
} from "@/lib/marketplace-data";
import { SellerCard } from "@/components/seller-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 네비게이션 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">마켓</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {marketCategories.slice(1, 5).map((cat) => (
              <span key={cat} className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">{cat}</span>
            ))}
          </nav>
          <Link href="/seller/dashboard" className="text-sm text-muted-foreground hover:text-foreground">판매자 센터</Link>
        </div>
      </header>

      {/* 히어로 */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            크리에이터의 작품을<br />
            <span className="text-primary">직접 만나보세요</span>
          </h1>
          <p className="mb-8 text-muted-foreground">핸드메이드, 디지털아트, 홈데코 등 독창적인 상품을 판매자에게서 직접 구매하세요.</p>
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-xl border bg-background px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="상품 또는 판매자 검색..." className="flex-1 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0" />
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="border-b py-6">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4">
          {marketCategories.map((cat) => (
            <Badge key={cat} variant="outline" className="shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm transition-colors hover:bg-accent">{cat}</Badge>
          ))}
        </div>
      </section>

      {/* 인기 상품 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">인기 상품</h2>
            <span className="flex cursor-pointer items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              전체보기 <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {marketProducts.slice(0, 8).map((product) => {
              const seller = getSellerById(product.sellerId);
              return (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col overflow-hidden rounded-xl border transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="flex h-40 items-center justify-center bg-muted text-5xl">{product.image}</div>
                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                    <h3 className="line-clamp-1 text-sm font-medium group-hover:text-primary">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount})</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="font-bold">{formatPrice(product.price)}</span>
                      {seller && <span className="text-xs text-muted-foreground">{seller.name}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 판매자 하이라이트 */}
      <section className="border-t py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold">인기 판매자</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 마켓플레이스. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
