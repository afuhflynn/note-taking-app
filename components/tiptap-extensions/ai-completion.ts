import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export interface AICompletionOptions {
  onTrigger: (text: string, context: string) => void;
  suggestion: string;
  isLoading: boolean;
}

export const AICompletionExtension = Extension.create<AICompletionOptions>({
  name: "aiCompletion",

  addOptions() {
    return {
      onTrigger: () => {},
      suggestion: "",
      isLoading: false,
    };
  },

  addProseMirrorPlugins() {
    const extensionThis = this;

    return [
      new Plugin({
        key: new PluginKey("aiCompletion"),

        state: {
          init() {
            return DecorationSet.empty;
          },

          apply(tr, oldState) {
            // If there's a suggestion, show it as a decoration
            if (extensionThis.options.suggestion) {
              const { selection } = tr;
              const decoration = Decoration.widget(
                selection.to,
                () => {
                  const span = document.createElement("span");
                  span.className = "ai-suggestion";
                  span.style.color = "#9ca3af";
                  span.style.fontStyle = "italic";
                  span.textContent = extensionThis.options.suggestion;
                  return span;
                },
                { side: 1 }
              );

              return DecorationSet.create(tr.doc, [decoration]);
            }

            return DecorationSet.empty;
          },
        },

        props: {
          decorations(state) {
            return this.getState(state);
          },

          handleKeyDown(view, event) {
            // Tab to accept suggestion
            if (event.key === "Tab" && extensionThis.options.suggestion) {
              event.preventDefault();
              const { state, dispatch } = view;
              const { selection } = state;
              const transaction = state.tr.insertText(
                extensionThis.options.suggestion,
                selection.to
              );
              dispatch(transaction);
              // Clear suggestion after accepting
              extensionThis.options.suggestion = "";
              return true;
            }

            // Escape to dismiss suggestion
            if (event.key === "Escape" && extensionThis.options.suggestion) {
              event.preventDefault();
              extensionThis.options.suggestion = "";
              return true;
            }

            // Ctrl/Cmd + Space to trigger AI completion
            if (
              (event.ctrlKey || event.metaKey) &&
              event.key === " " &&
              !extensionThis.options.isLoading
            ) {
              event.preventDefault();

              const { state } = view;
              const { from, to } = state.selection;

              // Get current paragraph text
              const currentNode = state.doc.nodeAt(from);
              const text = state.doc.textBetween(
                Math.max(0, from - 100),
                to,
                " "
              );

              // Get broader context
              const context = state.doc.textBetween(0, from, "\n\n");

              extensionThis.options.onTrigger(text, context);
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
