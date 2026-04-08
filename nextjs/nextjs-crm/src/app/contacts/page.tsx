"use client";

import { useState } from "react";
import { contacts } from "@/lib/crm-data";
import { Search, Users, ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactsPage() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.includes(search) ||
      c.company.includes(search) ||
      c.email.includes(search)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            파이프라인
          </Link>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">연락처</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 검색 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 회사, 이메일로 검색..."
              className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            연락처 추가
          </button>
        </div>

        {/* 연락처 그리드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((contact) => (
            <div
              key={contact.id}
              className="rounded-xl border bg-background p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {contact.position}
                  </p>
                </div>
              </div>

              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {contact.company}
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {contact.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {contact.phone}
                </div>
              </div>

              <div className="mt-4 border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  마지막 연락: {contact.lastContact}
                </p>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
