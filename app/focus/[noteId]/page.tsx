"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { X, Save, Maximize2, Minimize2 } from "lucide-react";
import { useAppStore } from "@/store/app.store";
import { useNote } from "@/hooks";
import { useState } from "react";
import { toast } from "sonner";

export default function FocusModePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { currentNote, setCurrentNote } = useAppStore();
  const { note, isPending } = useNote(noteId || "", true);

  useEffect(() => {
    if (note) {
      setCurrentNote(note as any);
    }
  }, [note, setCurrentNote]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleExit = () => {
    router.push(`/notes?id=${noteId}`);
  };

  const handleSave = () => {
    // Auto-save is already handling this
    toast.success("Note saved successfully!");
  };

  if (isPending) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Note not found</h2>
          <Button onClick={() => router.push("/notes")}>
            Go back to notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExit}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Exit Focus Mode
          </Button>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-medium text-muted-foreground truncate max-w-md">
            {currentNote.title || "Untitled Note"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="gap-2"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4" />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                Fullscreen
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor - Full Screen */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto px-8 py-8">
          <SimpleEditor
            content={currentNote.content}
            editable={true}
            placeholder="Start writing..."
          />
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-muted/80 backdrop-blur rounded-full text-xs text-muted-foreground">
        Press{" "}
        <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">
          Ctrl/Cmd
        </kbd>{" "}
        +{" "}
        <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">
          S
        </kbd>{" "}
        to save •{" "}
        <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">
          Esc
        </kbd>{" "}
        to exit
      </div>
    </div>
  );
}
