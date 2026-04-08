"use client";

import { useState } from "react";
import { ArrowLeft, Save, Globe, Palette, Shield, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

/* ---------- 설정 섹션 ---------- */
const sections = [
  { id: "general", label: "일반", icon: Globe },
  { id: "branding", label: "브랜딩", icon: Palette },
  { id: "security", label: "보안", icon: Shield },
  { id: "notifications", label: "알림", icon: Bell },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function TenantSettingsPage() {
  const params = useParams<{ tenant: string }>();
  const [activeSection, setActiveSection] = useState<SectionId>("general");
  const [tenantName, setTenantName] = useState("워크스페이스 이름");
  const [customDomain, setCustomDomain] = useState("");
  const [brandColor, setBrandColor] = useState("#6366f1");

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <Link
            href={`/${params.tenant}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            대시보드로
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold">워크스페이스 설정</h1>

        <div className="flex gap-8">
          {/* 사이드 탭 */}
          <nav className="w-48 shrink-0 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  activeSection === s.id
                    ? "bg-accent font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </button>
            ))}
          </nav>

          {/* 설정 패널 */}
          <div className="flex-1 rounded-xl border p-8">
            {activeSection === "general" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">일반 설정</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    워크스페이스 이름
                  </label>
                  <input
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    커스텀 도메인
                  </label>
                  <input
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="app.yourdomain.com"
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    CNAME 레코드를 설정한 후 도메인을 연결하세요.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "branding" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">브랜딩</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    브랜드 컬러
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="h-10 w-10 cursor-pointer rounded-lg border"
                    />
                    <span className="text-sm text-muted-foreground">
                      {brandColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">로고</label>
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
                    <p className="text-sm text-muted-foreground">
                      로고를 드래그하거나 클릭하여 업로드
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">보안</h2>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">2단계 인증 (2FA)</p>
                    <p className="text-sm text-muted-foreground">
                      모든 팀원에게 2FA를 필수로 요구합니다
                    </p>
                  </div>
                  <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-accent">
                    활성화
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">SSO 설정</p>
                    <p className="text-sm text-muted-foreground">
                      SAML/OIDC 기반 싱글 사인온을 구성합니다
                    </p>
                  </div>
                  <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-accent">
                    설정
                  </button>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">알림 설정</h2>
                {["새 팀원 가입", "결제 관련", "보안 경고", "주간 리포트"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <span className="text-sm">{item}</span>
                      <button className="rounded-full border px-3 py-1 text-xs hover:bg-accent">
                        켜짐
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* 저장 버튼 */}
            <div className="mt-8 flex justify-end">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Save className="h-4 w-4" />
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
