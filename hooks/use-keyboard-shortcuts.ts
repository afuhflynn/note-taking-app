import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";
import { toast } from "sonner";
import { useDesktopOS } from "./use-os";

interface KeyboardShortcutsOptions {
  onSave?: () => void;
  onNewNote?: () => void;
  handleTriggerAI?: () => void;
  handleAcceptSuggestion?: () => void;
  handleRejectSuggestion?: () => void;
  onVersionHistory?: () => void;
  onShortcuts?: () => void;
  onShare?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
}

export function useKeyboardShortcuts(options: KeyboardShortcutsOptions = {}) {
  const {
    onSave,
    onNewNote,
    handleTriggerAI,
    handleAcceptSuggestion,
    handleRejectSuggestion,
    onVersionHistory,
    onShortcuts,
    onShare,
    onArchive,
    onDelete,
    onRestore,
  } = options;
  const router = useRouter();
  const { setNewNote, currentNote, setCurrentNote } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // get user agent key
      const modKey = useDesktopOS(e);

      // Escape: Clear selection / Close modals
      if (e.key === "Escape") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // Close any open dialogs or modals
        const closeButtons = document.querySelectorAll("[data-dialog-close]");
        closeButtons.forEach((btn) => (btn as HTMLElement).click());
        // If ai suggestion dialog is open, reject it
        handleRejectSuggestion?.();
      }

      // handle shortcuts that depend on modKey
      if (modKey === "unknown") {
        return;
      }

      // Ctrl/Cmd + S: Save note
      if (modKey && e.key === "s") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        if (onSave) {
          onSave();
          toast.success("Note saved!");
        }
      }

      // Ctrl/Cmd + N: New note
      if (modKey && e.altKey && e.key === "n") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        if (onNewNote) {
          onNewNote();
          toast.info("Creating new note...");
        }
      }

      // Ctrl/Cmd + K: Search
      if (modKey && e.key === "k") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // Focus search input if it exists
        const searchInput = document.querySelector(
          "[data-search-box]",
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Ctrl/Cmd + Shift + H: Show version history
      if (modKey && e.shiftKey && e.key === "H") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // open the history dialog
        onVersionHistory?.();
      }

      // Ctrl/Cmd + Shift + S: Share open note
      if (modKey && e.shiftKey && e.key === "S") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // open the share dialog
        onShare?.();
      }

      // Ctrl/Cmd + Shift + J: Archive open note
      if (modKey && e.shiftKey && e.key === "J") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // open the archive dialog
        onArchive?.();
      }

      // Ctrl/Cmd + Shift + D: Delete open note
      if (modKey && e.shiftKey && e.key === "D") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // open the delete dialog
        onDelete?.();
      }

      // Ctrl/Cmd + Shift + R: Restore open note
      if (modKey && e.shiftKey && e.key === "R") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // open the restore dialog
        onRestore?.();
      }
      // Ctrl/Cmd + /: Show shortcuts help
      if (modKey && e.key === "/") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        // open the settings dialog
        onShortcuts?.();
      }

      // Ctrl/Cmd + W: Close current open note
      if (modKey && e.key === "Escape") {
        // First prevent the default behavior of the key strokes
        e.preventDefault();
        router.push("/notes");
        setCurrentNote(null);
        setNewNote(null);
      }

      // AI keyboard shortcuts

      // Ctrl/Cmd + Space: Trigger AI completion
      if (modKey && e.code === "Space") {
        e.preventDefault();

        handleTriggerAI?.();
      }

      // Tab: Accept suggestion (only if widget is visible)
      if (e.key === "Tab") {
        e.preventDefault();
        handleAcceptSuggestion?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, setNewNote, currentNote, options]);
}
