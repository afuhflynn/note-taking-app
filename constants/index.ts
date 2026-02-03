// Base API configuration
export const API_BASE = "/api";

export const shortcuts = [
  {
    category: "General",
    items: [
      { keys: ["Ctrl/Cmd", "S"], description: "Save open note" },
      { keys: ["Ctrl/Cmd", "Alt", "N"], description: "Create new note" },
      { keys: ["Ctrl/Cmd", "K"], description: "Focus search" },
      { keys: ["Ctrl/Cmd", "Shift", "S"], description: "Share open note" },
      { keys: ["Ctrl/Cmd", "Escape"], description: "Close open note" },
      {
        keys: ["Ctrl/Cmd", "Shift", "H"],
        description: "View version history",
      },
      { keys: ["Ctrl/Cmd", "/"], description: "Show this help" },
      { keys: ["Escape"], description: "Close dialogs/modals" },
      { keys: ["Ctrl/Cmd", "Shift", "J"], description: "Archive open note" },
      { keys: ["Ctrl/Cmd", "Shift", "R"], description: "Restore open note" },
      { keys: ["Ctrl/Cmd", "Shift", "D"], description: "Delete open note" },
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
      // { keys: ["Ctrl/Cmd", "F"], description: "Find in note" },
      // { keys: ["Ctrl/Cmd", "H"], description: "Replace" },
      // @todo: Implement these shortcuts
      { keys: ["Ctrl/Cmd", "Z"], description: "Undo" },
      { keys: ["Ctrl/Cmd", "Shift", "Z"], description: "Redo" },
    ],
  },
];
