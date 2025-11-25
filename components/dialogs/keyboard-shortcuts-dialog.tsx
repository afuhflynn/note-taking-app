"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Keyboard, Search, X } from "lucide-react";

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const shortcuts = [
    {
      category: "General",
      items: [
        { keys: ["Ctrl/Cmd", "S"], description: "Save current note" },
        { keys: ["Ctrl/Cmd", "N"], description: "Create new note" },
        { keys: ["Ctrl/Cmd", "K"], description: "Focus search" },
        {
          keys: ["Ctrl/Cmd", "Shift", "H"],
          description: "View version history",
        },
        { keys: ["Ctrl/Cmd", "/"], description: "Show this help" },
        { keys: ["Escape"], description: "Close dialogs/modals" },
      ],
    },
    {
      category: "Editor",
      items: [
        { keys: ["Ctrl/Cmd", "B"], description: "Bold text" },
        { keys: ["Ctrl/Cmd", "I"], description: "Italic text" },
        { keys: ["Ctrl/Cmd", "U"], description: "Underline text" },
        { keys: ["Ctrl/Cmd", "Shift", "X"], description: "Strikethrough" },
        { keys: ["Ctrl/Cmd", "E"], description: "Code" },
        { keys: ["Ctrl/Cmd", "Space"], description: "AI completion" },
        { keys: ["Tab"], description: "Accept AI suggestion" },
        { keys: ["Escape"], description: "Reject AI suggestion" },
      ],
    },
    {
      category: "Formatting",
      items: [
        { keys: ["Ctrl/Cmd", "Alt", "1"], description: "Heading 1" },
        { keys: ["Ctrl/Cmd", "Alt", "2"], description: "Heading 2" },
        { keys: ["Ctrl/Cmd", "Alt", "3"], description: "Heading 3" },
        { keys: ["Ctrl/Cmd", "Shift", "7"], description: "Ordered list" },
        { keys: ["Ctrl/Cmd", "Shift", "8"], description: "Bullet list" },
        { keys: ["Ctrl/Cmd", "Shift", "9"], description: "Blockquote" },
      ],
    },
    {
      category: "Navigation",
      items: [
        { keys: ["Ctrl/Cmd", "F"], description: "Find in note" },
        { keys: ["Ctrl/Cmd", "H"], description: "Replace" },
        { keys: ["Ctrl/Cmd", "Z"], description: "Undo" },
        { keys: ["Ctrl/Cmd", "Shift", "Z"], description: "Redo" },
      ],
    },
  ];

  // Flatten shortcuts for search
  const allShortcuts = useMemo(
    () =>
      shortcuts.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          category: category.category,
        }))
      ),
    [shortcuts]
  );

  // Filter shortcuts based on search query
  const filteredShortcuts = useMemo(() => {
    if (!searchQuery.trim()) {
      return shortcuts;
    }

    const query = searchQuery.toLowerCase();
    const matchedItems = allShortcuts.filter(
      (item) =>
        item.description.toLowerCase().includes(query) ||
        item.keys.some((key) => key.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query)
    );

    // Group matched items by category
    const grouped = shortcuts
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          matchedItems.some(
            (match) =>
              match.description === item.description &&
              match.category === category.category
          )
        ),
      }))
      .filter((category) => category.items.length > 0);

    return grouped;
  }, [searchQuery, shortcuts, allShortcuts]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Keyboard className="h-4 w-4" />
          <span className="hidden sm:inline">Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Master these shortcuts to boost your productivity
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shortcuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="space-y-6 mt-6">
          {filteredShortcuts.length > 0 ? (
            filteredShortcuts.map((category) => (
            <div key={category.category}>
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">{item.description}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="flex items-center gap-1"
                        >
                          <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">
                            {key}
                          </kbd>
                          {keyIndex < item.keys.length - 1 && (
                            <span className="text-muted-foreground">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No shortcuts match "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Press{" "}
            <kbd className="px-2 py-1 text-xs font-semibold bg-background border border-border rounded">
              Ctrl/Cmd
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-1 text-xs font-semibold bg-background border border-border rounded">
              /
            </kbd>{" "}
            anytime to see this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
