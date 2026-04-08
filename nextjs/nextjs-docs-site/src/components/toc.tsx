"use client";

import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface ITocItem {
  level: number;
  text: string;
  id: string;
}

interface ITocProps {
  items: ITocItem[];
}

export function Toc({ items }: ITocProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-56 shrink-0 p-4 overflow-y-auto">
      <div className="sticky top-4">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            목차
          </h4>
        </div>

        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-xs text-muted-foreground transition-colors hover:text-foreground",
                  item.level === 3 && "pl-3"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
