import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";
import { toast } from "sonner";

interface KeyboardShortcutsOptions {
  onSave?: () => void;
  onNewNote?: () => void;
  onSearch?: () => void;
}

export function useKeyboardShortcuts(options: KeyboardShortcutsOptions = {}) {
  const router = useRouter();
  const { setNewNote, currentNote } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + S: Save note
      if (modKey && e.key === "s") {
        e.preventDefault();
        if (options.onSave) {
          options.onSave();
          toast.success("Note saved!");
        }
      }

      // Ctrl/Cmd + N: New note
      if (modKey && e.key === "n") {
        e.preventDefault();
        if (options.onNewNote) {
          options.onNewNote();
        } else {
          setNewNote({
            title: "",
            content: "",
            tags: "",
            size: 0,
          });
          router.push("/notes");
          toast.info("Creating new note...");
        }
      }

      // Ctrl/Cmd + K: Search
      if (modKey && e.key === "k") {
        e.preventDefault();
        if (options.onSearch) {
          options.onSearch();
        } else {
          // Focus search input if it exists
          const searchInput = document.querySelector(
            'input[type="search"]'
          ) as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }
      }

      // Ctrl/Cmd + /: Show shortcuts help
      if (modKey && e.key === "/") {
        e.preventDefault();
        toast.info(
          "Keyboard Shortcuts:\n" +
            "• Ctrl/Cmd + S: Save\n" +
            "• Ctrl/Cmd + N: New Note\n" +
            "• Ctrl/Cmd + K: Search\n" +
            "• Ctrl/Cmd + /: Show this help",
          { duration: 5000 }
        );
      }

      // Escape: Clear selection / Close modals
      if (e.key === "Escape") {
        // Close any open dialogs or modals
        const closeButtons = document.querySelectorAll("[data-dialog-close]");
        closeButtons.forEach((btn) => (btn as HTMLElement).click());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [options, router, setNewNote, currentNote]);
}
