export interface IFileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number; // bytes
  modified: string;
  parentId: string | null;
  extension?: string;
}

// 파일 크기를 읽기 쉬운 형태로 변환
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// 확장자에 따른 파일 종류
export function getFileKind(ext?: string): string {
  if (!ext) return "파일";
  const map: Record<string, string> = {
    pdf: "PDF 문서",
    doc: "Word 문서",
    docx: "Word 문서",
    xls: "Excel 스프레드시트",
    xlsx: "Excel 스프레드시트",
    ppt: "PowerPoint",
    png: "PNG 이미지",
    jpg: "JPEG 이미지",
    svg: "SVG 이미지",
    mp4: "비디오",
    mp3: "오디오",
    zip: "압축 파일",
    ts: "TypeScript",
    tsx: "TypeScript React",
    js: "JavaScript",
    json: "JSON",
    md: "Markdown",
    txt: "텍스트",
  };
  return map[ext] || `${ext.toUpperCase()} 파일`;
}

// 모의 파일시스템 데이터
export const MOCK_FILES: IFileItem[] = [
  // 루트 폴더들
  { id: "f1", name: "문서", type: "folder", modified: "2026-03-30", parentId: null },
  { id: "f2", name: "이미지", type: "folder", modified: "2026-03-29", parentId: null },
  { id: "f3", name: "프로젝트", type: "folder", modified: "2026-03-31", parentId: null },
  { id: "f4", name: "다운로드", type: "folder", modified: "2026-03-28", parentId: null },
  // 루트 파일들
  { id: "r1", name: "README.md", type: "file", size: 2048, modified: "2026-03-31", parentId: null, extension: "md" },
  { id: "r2", name: "notes.txt", type: "file", size: 512, modified: "2026-03-30", parentId: null, extension: "txt" },
  // 문서 폴더 내부
  { id: "d1", name: "보고서.pdf", type: "file", size: 1048576, modified: "2026-03-30", parentId: "f1", extension: "pdf" },
  { id: "d2", name: "기획서.docx", type: "file", size: 524288, modified: "2026-03-29", parentId: "f1", extension: "docx" },
  { id: "d3", name: "예산.xlsx", type: "file", size: 262144, modified: "2026-03-28", parentId: "f1", extension: "xlsx" },
  { id: "d4", name: "발표자료.pptx", type: "file", size: 3145728, modified: "2026-03-27", parentId: "f1", extension: "ppt" },
  // 이미지 폴더 내부
  { id: "i1", name: "스크린샷", type: "folder", modified: "2026-03-29", parentId: "f2" },
  { id: "i2", name: "hero-banner.png", type: "file", size: 2097152, modified: "2026-03-28", parentId: "f2", extension: "png" },
  { id: "i3", name: "logo.svg", type: "file", size: 8192, modified: "2026-03-25", parentId: "f2", extension: "svg" },
  { id: "i4", name: "photo.jpg", type: "file", size: 4194304, modified: "2026-03-26", parentId: "f2", extension: "jpg" },
  // 스크린샷 폴더 내부
  { id: "s1", name: "capture-01.png", type: "file", size: 1572864, modified: "2026-03-29", parentId: "i1", extension: "png" },
  { id: "s2", name: "capture-02.png", type: "file", size: 1048576, modified: "2026-03-29", parentId: "i1", extension: "png" },
  // 프로젝트 폴더 내부
  { id: "p1", name: "index.tsx", type: "file", size: 4096, modified: "2026-03-31", parentId: "f3", extension: "tsx" },
  { id: "p2", name: "package.json", type: "file", size: 1024, modified: "2026-03-31", parentId: "f3", extension: "json" },
  { id: "p3", name: "utils.ts", type: "file", size: 2048, modified: "2026-03-30", parentId: "f3", extension: "ts" },
  // 다운로드 폴더 내부
  { id: "dl1", name: "archive.zip", type: "file", size: 10485760, modified: "2026-03-28", parentId: "f4", extension: "zip" },
  { id: "dl2", name: "setup.exe", type: "file", size: 52428800, modified: "2026-03-27", parentId: "f4", extension: "exe" },
];
