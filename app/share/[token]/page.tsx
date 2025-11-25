"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";

export default function SharedNotePage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const router = useRouter();
  const [sharedNote, setSharedNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const res = await fetch(`/api/share/${token}`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to load shared note");

        setSharedNote(data.sharedNote);
        setEditable(data.permission === "EDIT");
        setEditingContent(data.sharedNote.note.content);
        setEditingTitle(data.sharedNote.note.title);
      } catch (err) {
        toast.error((err as Error).message);
        router.push("/notes");
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, [token, router]);

  const handleSave = async () => {
    if (!editable) {
      toast.error("You do not have permission to edit this note");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/share/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editingContent,
          title: editingTitle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save note");
      }

      // Update local state with saved content
      setSharedNote((prev: any) => ({
        ...prev,
        note: {
          ...prev.note,
          title: editingTitle,
          content: editingContent,
          updatedAt: new Date().toISOString(),
        },
      }));

      toast.success("Note saved successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!sharedNote) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 flex items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        {editable ? (
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="text-lg font-medium flex-1 bg-transparent border-none focus:outline-none"
            placeholder="Untitled Note"
          />
        ) : (
          <h1 className="text-lg font-medium flex-1 truncate">
            {sharedNote.note.title || "Untitled Note"}
          </h1>
        )}

        {!editable && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm">
            <Lock className="h-4 w-4" />
            View Only
          </div>
        )}

        {editable && (
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-8 max-w-4xl mx-auto w-full">
        {editable ? (
          <SimpleEditor
            content={editingContent}
            showThemeToggle={false}
            className="editor-wrapper"
            contentClass="editor-content"
          />
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <SimpleEditor
              content={sharedNote.note.content}
              showThemeToggle={false}
              className="editor-wrapper"
              contentClass="editor-content"
            />
          </div>
        )}
      </div>

      {/* Footer with metadata */}
      <div className="border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground flex justify-between">
        <span>Shared by {sharedNote.note.user.name}</span>
        <span>Last updated: {new Date(sharedNote.note.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
