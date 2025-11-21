import { useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { useUpdateNote } from "./index";
import { useAppStore } from "@/store/app.store";
import { toast } from "sonner";

export function useAutoSave(delay: number = 2000) {
  const { currentNote, editContent, contentUpdated, setContentUpdated } =
    useAppStore();
  const { update, isPending } = useUpdateNote();
  const lastSavedContent = useRef<any>(null);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(
      (
        noteId: string,
        content: any,
        title: string,
        tags: string,
        size: number
      ) => {
        // Only save if content has actually changed
        if (
          JSON.stringify(content) !== JSON.stringify(lastSavedContent.current)
        ) {
          update({
            id: noteId,
            title,
            content,
            tags,
            size,
          });
          lastSavedContent.current = content;
          setContentUpdated(false);
        }
      },
      delay
    ),
    [update, delay]
  );

  // Trigger auto-save when content changes
  useEffect(() => {
    if (currentNote && editContent && contentUpdated && !isPending) {
      debouncedSave(
        currentNote.id,
        editContent,
        currentNote.title,
        currentNote.tags?.map((t) => t.name).join(" ") || "",
        JSON.stringify(editContent).length
      );
    }
  }, [editContent, contentUpdated, currentNote, isPending, debouncedSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return {
    isSaving: isPending,
    forceSave: () => {
      debouncedSave.flush();
    },
  };
}
