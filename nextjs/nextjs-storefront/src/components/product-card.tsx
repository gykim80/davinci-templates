import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { type IProduct, formatPrice } from "@/lib/products";

interface IProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: IProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border bg-background",
        "transition-all duration-200 hover:shadow-lg hover:border-primary/20"
      )}
    >
      {/* 이미지 영역 */}
      <div className="relative flex h-48 items-center justify-center bg-muted text-6xl">
        {product.image}
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm font-medium text-muted-foreground">
              품절
            </span>
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs text-muted-foreground">
          {product.category}
        </span>
        <h3 className="line-clamp-1 text-sm font-medium group-hover:text-primary">
          {product.name}
        </h3>

        {/* 평점 */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* 가격 */}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
