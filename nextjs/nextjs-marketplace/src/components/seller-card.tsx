import { Star, BadgeCheck, Package, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ISeller } from "@/lib/marketplace-data";

interface ISellerCardProps {
  seller: ISeller;
}

export function SellerCard({ seller }: ISellerCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border p-6 text-center",
        "transition-all duration-200 hover:shadow-lg hover:border-primary/20"
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl">
        {seller.avatar}
      </div>
      <div>
        <div className="flex items-center justify-center gap-1.5">
          <h3 className="font-semibold">{seller.name}</h3>
          {seller.verified && (
            <BadgeCheck className="h-4 w-4 text-blue-500" />
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {seller.description}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{seller.rating}</span>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {seller.salesCount.toLocaleString()}건 판매
        </span>
        <span className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          {seller.productCount}개 상품
        </span>
      </div>
    </div>
  );
}
