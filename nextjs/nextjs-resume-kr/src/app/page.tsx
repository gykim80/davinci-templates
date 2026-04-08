"use client";

import { useState } from "react";
import {
  FileText, Eye, Download, Edit3, User, GraduationCap,
  Briefcase, Award, PenLine, Plus, Trash2, X, Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type IResumeData, type IEducation, type ICareer, type ICertificate,
  EMPTY_RESUME, SAMPLE_RESUME,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TabId = "personal" | "education" | "career" | "certificates" | "skills" | "introduction";

export default function ResumePage() {
  const [resume, setResume] = useState<IResumeData>(EMPTY_RESUME);
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [showPreview, setShowPreview] = useState(false);

  const loadSample = () => setResume(SAMPLE_RESUME);

  const handlePrint = () => window.print();

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "personal", label: "인적사항", icon: <User className="h-4 w-4" /> },
    { id: "education", label: "학력", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "career", label: "경력", icon: <Briefcase className="h-4 w-4" /> },
    { id: "certificates", label: "자격증", icon: <Award className="h-4 w-4" /> },
    { id: "skills", label: "기술스택", icon: <Code className="h-4 w-4" /> },
    { id: "introduction", label: "자기소개서", icon: <PenLine className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="no-print sticky top-0 z-10 border-b bg-background/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <FileText className="h-6 w-6 text-blue-500" />
          <h1 className="text-lg font-bold">이력서 빌더</h1>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={loadSample}>
            샘플 불러오기
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <Edit3 className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showPreview ? "편집" : "미리보기"}
          </Button>
          <Button size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-3.5 w-3.5" />
            PDF 저장
          </Button>
        </div>
      </header>

      {showPreview ? (
        <ResumePreview resume={resume} />
      ) : (
        <main className="mx-auto max-w-4xl px-4 py-6">
          {/* 탭 네비게이션 */}
          <div className="no-print mb-6 flex gap-1 overflow-x-auto rounded-xl border bg-card p-1">
            {tabs.map((t) => (
              <Button key={t.id} onClick={() => setActiveTab(t.id)}
                variant={activeTab === t.id ? "default" : "ghost"}
                size="sm"
                className={cn("whitespace-nowrap",
                  activeTab !== t.id && "text-muted-foreground"
                )}>
                {t.icon}{t.label}
              </Button>
            ))}
          </div>

          {/* 폼 영역 */}
          <FormSection tab={activeTab} resume={resume} setResume={setResume} />
        </main>
      )}
    </div>
  );
}

/* === 폼 섹션 라우터 === */
function FormSection({ tab, resume, setResume }: {
  tab: TabId; resume: IResumeData; setResume: (r: IResumeData) => void;
}) {
  const updatePersonal = (field: string, value: string) =>
    setResume({ ...resume, personal: { ...resume.personal, [field]: value } });

  switch (tab) {
    case "personal":
      return (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h3 className="text-lg font-bold">인적사항</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="이름" value={resume.personal.name} onChange={(v) => updatePersonal("name", v)} />
              <InputField label="생년월일" type="date" value={resume.personal.birthDate} onChange={(v) => updatePersonal("birthDate", v)} />
              <InputField label="연락처" value={resume.personal.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="010-0000-0000" />
              <InputField label="이메일" type="email" value={resume.personal.email} onChange={(v) => updatePersonal("email", v)} />
            </div>
            <InputField label="주소" value={resume.personal.address} onChange={(v) => updatePersonal("address", v)} />
          </CardContent>
        </Card>
      );
    case "education":
      return <EducationForm items={resume.education} onChange={(edu) => setResume({ ...resume, education: edu })} />;
    case "career":
      return <CareerForm items={resume.career} onChange={(car) => setResume({ ...resume, career: car })} />;
    case "certificates":
      return <CertForm items={resume.certificates} onChange={(certs) => setResume({ ...resume, certificates: certs })} />;
    case "skills":
      return <SkillsForm skills={resume.skills} onChange={(s) => setResume({ ...resume, skills: s })} />;
    case "introduction":
      return (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h3 className="text-lg font-bold">자기소개서</h3>
            <Textarea
              rows={12}
              value={resume.introduction}
              onChange={(e) => setResume({ ...resume, introduction: e.target.value })}
              placeholder="자기소개서를 작성하세요..."
              className="leading-relaxed"
            />
            <p className="text-right text-xs text-muted-foreground">{resume.introduction.length}자</p>
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
}

/* 입력 필드 */
function InputField({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

/* 학력 폼 */
function EducationForm({ items, onChange }: { items: IEducation[]; onChange: (v: IEducation[]) => void }) {
  const add = () => onChange([...items, { id: crypto.randomUUID(), school: "", major: "", degree: "학사", startDate: "", endDate: "", status: "졸업" }]);
  const remove = (id: string) => onChange(items.filter((e) => e.id !== id));
  const update = (id: string, field: string, value: string) =>
    onChange(items.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-4">
      {items.map((edu) => (
        <Card key={edu.id}>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">학력</span>
              <Button variant="ghost" size="icon" onClick={() => remove(edu.id)} className="text-destructive hover:opacity-70 h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <InputField label="학교명" value={edu.school} onChange={(v) => update(edu.id, "school", v)} />
              <InputField label="전공" value={edu.major} onChange={(v) => update(edu.id, "major", v)} />
              <InputField label="입학일" type="month" value={edu.startDate} onChange={(v) => update(edu.id, "startDate", v)} />
              <InputField label="졸업일" type="month" value={edu.endDate} onChange={(v) => update(edu.id, "endDate", v)} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={add} className="flex w-full items-center justify-center gap-2 border-dashed text-muted-foreground hover:text-foreground">
        <Plus className="h-4 w-4" />학력 추가
      </Button>
    </div>
  );
}

/* 경력 폼 */
function CareerForm({ items, onChange }: { items: ICareer[]; onChange: (v: ICareer[]) => void }) {
  const add = () => onChange([...items, { id: crypto.randomUUID(), company: "", position: "", department: "", startDate: "", endDate: "", isCurrent: false, description: "" }]);
  const remove = (id: string) => onChange(items.filter((c) => c.id !== id));
  const update = (id: string, field: string, value: string | boolean) =>
    onChange(items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  return (
    <div className="space-y-4">
      {items.map((car) => (
        <Card key={car.id}>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">경력</span>
              <Button variant="ghost" size="icon" onClick={() => remove(car.id)} className="text-destructive hover:opacity-70 h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <InputField label="회사명" value={car.company} onChange={(v) => update(car.id, "company", v)} />
              <InputField label="직위" value={car.position} onChange={(v) => update(car.id, "position", v)} />
              <InputField label="부서" value={car.department} onChange={(v) => update(car.id, "department", v)} />
              <InputField label="입사일" type="month" value={car.startDate} onChange={(v) => update(car.id, "startDate", v)} />
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={car.isCurrent} onChange={(e) => update(car.id, "isCurrent", e.target.checked)} />
              현재 재직 중
            </label>
            {!car.isCurrent && (
              <InputField label="퇴사일" type="month" value={car.endDate} onChange={(v) => update(car.id, "endDate", v)} />
            )}
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">업무 내용</label>
              <Textarea rows={2} value={car.description} onChange={(e) => update(car.id, "description", e.target.value)} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={add} className="flex w-full items-center justify-center gap-2 border-dashed text-muted-foreground hover:text-foreground">
        <Plus className="h-4 w-4" />경력 추가
      </Button>
    </div>
  );
}

/* 자격증 폼 */
function CertForm({ items, onChange }: { items: ICertificate[]; onChange: (v: ICertificate[]) => void }) {
  const add = () => onChange([...items, { id: crypto.randomUUID(), name: "", issuer: "", date: "" }]);
  const remove = (id: string) => onChange(items.filter((c) => c.id !== id));
  const update = (id: string, field: string, value: string) =>
    onChange(items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  return (
    <div className="space-y-4">
      {items.map((cert) => (
        <Card key={cert.id}>
          <CardContent className="p-4">
            <div className="mb-3 flex justify-between">
              <span className="text-sm font-medium">자격증</span>
              <Button variant="ghost" size="icon" onClick={() => remove(cert.id)} className="text-destructive hover:opacity-70 h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <InputField label="자격증명" value={cert.name} onChange={(v) => update(cert.id, "name", v)} />
              <InputField label="발급기관" value={cert.issuer} onChange={(v) => update(cert.id, "issuer", v)} />
              <InputField label="취득일" type="month" value={cert.date} onChange={(v) => update(cert.id, "date", v)} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={add} className="flex w-full items-center justify-center gap-2 border-dashed text-muted-foreground hover:text-foreground">
        <Plus className="h-4 w-4" />자격증 추가
      </Button>
    </div>
  );
}

/* 기술스택 폼 */
function SkillsForm({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => { if (input.trim()) { onChange([...skills, input.trim()]); setInput(""); } };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-bold">기술스택</h3>
        <div className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
            placeholder="기술명을 입력하세요" className="flex-1" />
          <Button onClick={add} size="sm">추가</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <Badge key={i} variant="secondary" className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400">
              {s}
              <button onClick={() => onChange(skills.filter((_, idx) => idx !== i))}><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* === 이력서 미리보기 (인쇄용) === */
function ResumePreview({ resume }: { resume: IResumeData }) {
  const p = resume.personal;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-xl border bg-white p-8 text-black dark:bg-white">
        {/* 제목 */}
        <h2 className="mb-6 border-b-2 border-black pb-2 text-center text-2xl font-bold">이 력 서</h2>

        {/* 인적사항 */}
        <table className="mb-6 w-full border-collapse text-sm">
          <tbody>
            <tr className="border">
              <td className="w-24 border bg-gray-100 p-2 text-center font-medium">성명</td>
              <td className="border p-2">{p.name || "-"}</td>
              <td className="w-24 border bg-gray-100 p-2 text-center font-medium">생년월일</td>
              <td className="border p-2">{p.birthDate || "-"}</td>
            </tr>
            <tr className="border">
              <td className="border bg-gray-100 p-2 text-center font-medium">연락처</td>
              <td className="border p-2">{p.phone || "-"}</td>
              <td className="border bg-gray-100 p-2 text-center font-medium">이메일</td>
              <td className="border p-2">{p.email || "-"}</td>
            </tr>
            <tr className="border">
              <td className="border bg-gray-100 p-2 text-center font-medium">주소</td>
              <td className="border p-2" colSpan={3}>{p.address || "-"}</td>
            </tr>
          </tbody>
        </table>

        {/* 학력 */}
        {resume.education.length > 0 && (
          <Section title="학력">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border bg-gray-100">
                  <th className="border p-2">기간</th><th className="border p-2">학교명</th>
                  <th className="border p-2">전공</th><th className="border p-2">상태</th>
                </tr>
              </thead>
              <tbody>
                {resume.education.map((e) => (
                  <tr key={e.id} className="border">
                    <td className="border p-2 text-center">{e.startDate} ~ {e.endDate}</td>
                    <td className="border p-2">{e.school}</td>
                    <td className="border p-2">{e.major}</td>
                    <td className="border p-2 text-center">{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {/* 경력 */}
        {resume.career.length > 0 && (
          <Section title="경력사항">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border bg-gray-100">
                  <th className="border p-2">기간</th><th className="border p-2">회사명</th>
                  <th className="border p-2">직위</th><th className="border p-2">업무내용</th>
                </tr>
              </thead>
              <tbody>
                {resume.career.map((c) => (
                  <tr key={c.id} className="border">
                    <td className="border p-2 text-center whitespace-nowrap">{c.startDate} ~ {c.isCurrent ? "현재" : c.endDate}</td>
                    <td className="border p-2">{c.company}</td>
                    <td className="border p-2">{c.position}</td>
                    <td className="border p-2">{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {/* 자격증 */}
        {resume.certificates.length > 0 && (
          <Section title="자격증">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border bg-gray-100">
                  <th className="border p-2">자격증명</th><th className="border p-2">발급기관</th><th className="border p-2">취득일</th>
                </tr>
              </thead>
              <tbody>
                {resume.certificates.map((c) => (
                  <tr key={c.id} className="border">
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.issuer}</td>
                    <td className="border p-2 text-center">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {/* 기술스택 */}
        {resume.skills.length > 0 && (
          <Section title="기술스택">
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((s, i) => (
                <span key={i} className="rounded border px-2 py-1 text-sm">{s}</span>
              ))}
            </div>
          </Section>
        )}

        {/* 자기소개서 */}
        {resume.introduction && (
          <Section title="자기소개서">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{resume.introduction}</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 border-b border-gray-300 pb-1 text-base font-bold">{title}</h3>
      {children}
    </div>
  );
}
