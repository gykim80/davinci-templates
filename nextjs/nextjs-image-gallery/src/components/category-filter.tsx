"use client";

import { cn } from "@/lib/utils";
import { categories, type Category } from "@/data/images";

interface ICategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

/** 카테고리 필터 버튼 그룹 */
export function CategoryFilter({ selected, onSelect }: ICategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
