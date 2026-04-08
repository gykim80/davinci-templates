"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, FileText, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { wikiNav } from "@/lib/wiki-data";

export function WikiSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-60 shrink-0 border-r p-4 overflow-y-auto">
      <div className="mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
        >
          <FolderOpen className="h-4 w-4" />
          위키 홈
        </Link>
      </div>

      <div className="space-y-5">
        {wikiNav.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.children.map((page) => {
                const href = `/wiki/${page.slug.join("/")}`;
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
