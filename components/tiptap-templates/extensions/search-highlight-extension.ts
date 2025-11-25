import { Extension } from "@tiptap/core";
import type { Editor } from "@tiptap/core";

export const SearchHighlight = Extension.create({
  name: "searchHighlight",

  addOptions() {
    return {
      className: "bg-yellow-200 dark:bg-yellow-700",
      searchTerm: "",
    };
  },

  addStorage() {
    return {
      searchTerm: "",
    };
  },

  addCommands() {
    return {
      setSearchTerm:
        (searchTerm: string) =>
        ({ commands, editor }: { commands: any; editor: Editor }) => {
          this.storage.searchTerm = searchTerm;

          if (!searchTerm) {
            // Clear highlights
            return commands.clearNodes();
          }

          // This will trigger an update
          editor.view.updateState(editor.state);
          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      // Highlight next match
      "ctrl-g": ({ editor }: { editor: Editor }) => {
        const { searchTerm } = this.storage;
        if (!searchTerm) return false;

        const { $from } = editor.state.selection;
        const text = editor.getText();
        const regex = new RegExp(
          searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "gi"
        );

        let currentIndex = 0;
        let match = regex.exec(text);
        while (match && match.index <= $from.pos) {
          currentIndex = match.index;
          match = regex.exec(text);
        }

        if (match) {
          editor
            .chain()
            .focus()
            .setTextSelection({
              from: match.index + 1,
              to: match.index + 1 + match[0].length,
            })
            .run();
        }

        return true;
      },
    };
  },
});
