"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { docSections } from "@/lib/docs";

export function DocSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 border-r p-4 overflow-y-auto">
      <div className="space-y-6">
        {docSections.map((section) => (
          <div key={section.title}>
            {/* 섹션 제목 */}
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>

            {/* 페이지 목록 */}
            <ul className="space-y-1">
              {section.pages.map((page) => {
                const href = `/docs/${page.slug.join("/")}`;
                const isActive = pathname === href;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {isActive ? (
                        <ChevronRight className="h-3.5 w-3.5" />
                      ) : (
                        <FileText className="h-3.5 w-3.5" />
                      )}
                      {page.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
