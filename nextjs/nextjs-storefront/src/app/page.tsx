import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
  Zap,
  Truck,
  Shield,
  Tag,
} from "lucide-react";
import { products, categories, formatPrice } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  // 인기 상품 8개
  const popularProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* 네비게이션 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">스토어</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {categories.slice(1, 5).map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {cat}
              </Link>
            ))}
          </nav>
          <Link
            href="/cart"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            장바구니
          </Link>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              신규 회원 15% 할인
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              당신의 라이프스타일을
              <br />
              <span className="text-primary">완성하세요</span>
            </h1>
            <p className="mb-8 max-w-lg text-muted-foreground">
              전자기기부터 패션, 가구까지. 엄선된 프리미엄 상품을 합리적인 가격에
              만나보세요.
            </p>
            <div className="flex gap-3">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/products">
                  쇼핑 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <Link href="/products?category=전자기기">
                  베스트셀러
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 네비게이션 */}
      <section className="border-b py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {categories.slice(1).map((cat) => (
              <Card key={cat} className="transition-all hover:border-primary/30 hover:shadow-sm">
                <Link href={`/products?category=${cat}`}>
                  <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                    <span className="text-2xl">
                      {cat === "전자기기" && "📱"}
                      {cat === "의류" && "👗"}
                      {cat === "가구" && "🛋️"}
                      {cat === "식품" && "🍎"}
                      {cat === "뷰티" && "💄"}
                      {cat === "스포츠" && "🏃"}
                      {cat === "도서" && "📖"}
                    </span>
                    <span className="text-sm font-medium">{cat}</span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 혜택 배너 */}
      <section className="border-b py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>₩50,000 이상 무료배송</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>안전결제 보장</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>당일 출고</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>최저가 보장</span>
          </div>
        </div>
      </section>

      {/* 인기 상품 그리드 4x2 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">인기 상품</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                지금 가장 많이 찾는 상품을 만나보세요
              </p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              전체보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 프로모션 배너 */}
      <section className="border-t py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
            <h2 className="mb-2 text-2xl font-bold">
              봄 시즌 특별 세일
            </h2>
            <p className="mb-6 text-muted-foreground">
              전 카테고리 최대 30% 할인. 지금 바로 확인하세요.
            </p>
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/products">
                세일 상품 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 스토어. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
