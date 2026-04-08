"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Folder,
  File,
  Grid3X3,
  List,
  ChevronRight,
  Home,
  Upload,
  Trash2,
  Pencil,
  MoreVertical,
  FolderOpen,
  Image,
  FileText,
  FileCode,
  Archive,
  HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  MOCK_FILES,
  formatFileSize,
  getFileKind,
  type IFileItem,
} from "@/data/filesystem";

// 파일 확장자에 따른 아이콘
function FileIcon({ ext, className }: { ext?: string; className?: string }) {
  if (!ext) return <File className={className} />;
  if (["png", "jpg", "jpeg", "svg", "gif", "webp"].includes(ext))
    return <Image className={className} />;
  if (["pdf", "doc", "docx", "txt", "md", "ppt", "pptx", "xls", "xlsx"].includes(ext))
    return <FileText className={className} />;
  if (["ts", "tsx", "js", "jsx", "json", "html", "css"].includes(ext))
    return <FileCode className={className} />;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext))
    return <Archive className={className} />;
  return <File className={className} />;
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<IFileItem[]>(MOCK_FILES);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [contextMenu, setContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // 현재 폴더의 파일 목록 (폴더 우선, 이름순)
  const currentItems = useMemo(() => {
    return files
      .filter((f) => f.parentId === currentFolderId)
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
        return a.name.localeCompare(b.name, "ko");
      });
  }, [files, currentFolderId]);

  // 브레드크럼 경로 계산
  const breadcrumbs = useMemo(() => {
    const trail: { id: string | null; name: string }[] = [{ id: null, name: "내 파일" }];
    let id = currentFolderId;
    while (id) {
      const item = files.find((f) => f.id === id);
      if (!item) break;
      trail.push({ id: item.id, name: item.name });
      id = item.parentId;
    }
    return [trail[0], ...trail.slice(1).reverse()];
  }, [currentFolderId, files]);

  // 폴더 진입
  const enterFolder = useCallback((folderId: string) => {
    setCurrentFolderId(folderId);
    setContextMenu(null);
  }, []);

  // 아이템 삭제
  const deleteItem = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id && f.parentId !== id));
    setContextMenu(null);
  }, []);

  // 이름 변경 시작
  const startRename = useCallback((item: IFileItem) => {
    setRenameId(item.id);
    setRenameValue(item.name);
    setContextMenu(null);
  }, []);

  // 이름 변경 확정
  const confirmRename = useCallback(() => {
    if (renameId && renameValue.trim()) {
      setFiles((prev) =>
        prev.map((f) => (f.id === renameId ? { ...f, name: renameValue.trim() } : f))
      );
    }
    setRenameId(null);
  }, [renameId, renameValue]);

  return (
    <div className="flex h-screen flex-col bg-background" onClick={() => setContextMenu(null)}>
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">파일 매니저</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl">
            <Upload className="h-4 w-4" />
            업로드
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1 border-b px-6 py-2 text-sm">
        {breadcrumbs.map((bc, idx) => (
          <span key={bc.id ?? "root"} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentFolderId(bc.id)}
              className={cn(
                "h-auto px-1.5 py-0.5",
                idx === breadcrumbs.length - 1 ? "font-medium" : "text-muted-foreground"
              )}
            >
              {idx === 0 && <Home className="h-3.5 w-3.5" />}
              {bc.name}
            </Button>
          </span>
        ))}
      </nav>

      {/* 파일 목록 */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <FolderOpen className="mb-3 h-12 w-12" />
            <p className="text-sm">비어 있는 폴더입니다</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {currentItems.map((item) => (
              <Card
                key={item.id}
                onDoubleClick={() => item.type === "folder" && enterFolder(item.id)}
                className="group relative cursor-pointer transition-colors hover:bg-muted/50"
              >
                <CardContent className="flex flex-col items-center gap-2 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setContextMenu({ id: item.id, x: e.clientX, y: e.clientY });
                  }}
                  className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
                {item.type === "folder" ? (
                  <Folder className="h-10 w-10 text-blue-400" />
                ) : (
                  <FileIcon ext={item.extension} className="h-10 w-10 text-muted-foreground" />
                )}
                {renameId === item.id ? (
                  <Input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={confirmRename}
                    onKeyDown={(e) => e.key === "Enter" && confirmRename()}
                    className="w-full h-6 text-center text-xs px-1"
                  />
                ) : (
                  <span className="max-w-full truncate text-xs">{item.name}</span>
                )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2 font-medium">이름</th>
                <th className="pb-2 font-medium">종류</th>
                <th className="pb-2 font-medium">크기</th>
                <th className="pb-2 font-medium">수정일</th>
                <th className="pb-2 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  onDoubleClick={() => item.type === "folder" && enterFolder(item.id)}
                  className="group border-b transition-colors hover:bg-muted/50 cursor-pointer"
                >
                  <td className="flex items-center gap-2 py-2.5">
                    {item.type === "folder" ? (
                      <Folder className="h-4 w-4 text-blue-400" />
                    ) : (
                      <FileIcon ext={item.extension} className="h-4 w-4 text-muted-foreground" />
                    )}
                    {renameId === item.id ? (
                      <Input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={confirmRename}
                        onKeyDown={(e) => e.key === "Enter" && confirmRename()}
                        className="h-7 px-1 text-sm"
                      />
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </td>
                  <td className="py-2.5 text-muted-foreground">
                    {item.type === "folder" ? "폴더" : getFileKind(item.extension)}
                  </td>
                  <td className="py-2.5 text-muted-foreground">
                    {item.size ? formatFileSize(item.size) : "--"}
                  </td>
                  <td className="py-2.5 text-muted-foreground">{item.modified}</td>
                  <td className="py-2.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setContextMenu({ id: item.id, x: e.clientX, y: e.clientY });
                      }}
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* 컨텍스트 메뉴 */}
      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed z-50 min-w-36 rounded-xl border bg-background p-1 shadow-lg"
        >
          <Button
            variant="ghost"
            onClick={() => startRename(files.find((f) => f.id === contextMenu.id)!)}
            className="flex w-full items-center justify-start gap-2 h-auto px-3 py-2 text-sm"
          >
            <Pencil className="h-3.5 w-3.5" /> 이름 변경
          </Button>
          <Button
            variant="ghost"
            onClick={() => deleteItem(contextMenu.id)}
            className="flex w-full items-center justify-start gap-2 h-auto px-3 py-2 text-sm text-red-400 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" /> 삭제
          </Button>
        </div>
      )}

      {/* 하단 상태바 */}
      <footer className="flex items-center justify-between border-t px-6 py-2 text-xs text-muted-foreground">
        <span>{currentItems.length}개 항목</span>
        <span>
          {currentItems.filter((i) => i.type === "folder").length}개 폴더,{" "}
          {currentItems.filter((i) => i.type === "file").length}개 파일
        </span>
      </footer>
    </div>
  );
}
