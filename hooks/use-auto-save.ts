import { useEffect, useRef, useCallback, useState } from "react";
import { debounce } from "lodash";
import { useUpdateNote } from "./index";
import { useAppStore } from "@/store/app.store";
import { toast } from "sonner";
import { useOnlineStatus } from "./use-online-status";

export function useAutoSave(delay: number = 2000) {
  const { currentNote, editContent, contentUpdated, setContentUpdated } =
    useAppStore();
  const { update, isPending } = useUpdateNote();
  const lastSavedContent = useRef<any>(null);
  const isOnline = useOnlineStatus();
  const [pendingSaves, setPendingSaves] = useState<any[]>([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Save to local storage when offline
  const saveToLocalStorage = useCallback((noteId: string, content: any) => {
    try {
      const key = `offline-note-${noteId}`;
      localStorage.setItem(
        key,
        JSON.stringify({
          content,
          timestamp: Date.now(),
        })
      );
      setIsOfflineMode(true);
      toast.info("Working offline - changes saved locally", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to save to local storage:", error);
    }
  }, []);

  // Restore from local storage
  const restoreFromLocalStorage = useCallback((noteId: string) => {
    try {
      const key = `offline-note-${noteId}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const { content, timestamp } = JSON.parse(saved);
        return { content, timestamp };
      }
    } catch (error) {
      console.error("Failed to restore from local storage:", error);
    }
    return null;
  }, []);

  // Clear local storage after successful sync
  const clearLocalStorage = useCallback((noteId: string) => {
    try {
      const key = `offline-note-${noteId}`;
      localStorage.removeItem(key);
      setIsOfflineMode(false);
    } catch (error) {
      console.error("Failed to clear local storage:", error);
    }
  }, []);

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
          if (!isOnline) {
            // Save to local storage when offline
            saveToLocalStorage(noteId, content);
            setPendingSaves((prev) => [
              ...prev,
              { noteId, content, title, tags, size },
            ]);
          } else {
            // Save to server when online
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
        }
      },
      delay
    ),
    [update, delay, isOnline, saveToLocalStorage, setContentUpdated]
  );

  // Sync pending saves when coming back online
  useEffect(() => {
    if (isOnline && pendingSaves.length > 0) {
      toast.success("Back online - syncing changes...");

      pendingSaves.forEach(({ noteId, content, title, tags, size }) => {
        update({
          id: noteId,
          title,
          content,
          tags,
          size,
        });
        clearLocalStorage(noteId);
      });

      setPendingSaves([]);
      toast.success("All changes synced successfully!");
    }
  }, [isOnline, pendingSaves, update, clearLocalStorage]);

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
    isOfflineMode,
    isOnline,
    forceSave: () => {
      debouncedSave.flush();
    },
  };
}
