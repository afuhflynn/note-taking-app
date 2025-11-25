"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Lib ---
import { cn, handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAppStore } from "@/store/app.store";
import { useAutoSave } from "@/hooks/use-auto-save";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useAICompletion } from "@/hooks/use-ai-completion";
import { AISuggestionWidget } from "@/components/editor/ai-suggestion-widget";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  showThemeToggle,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  showThemeToggle: boolean;
}) => {
  const { newNote, currentNote } = useAppStore();
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {(newNote || currentNote) && (
        <ToolbarGroup>
          <ImageUploadButton text="Add" />
        </ToolbarGroup>
      )}

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      {showThemeToggle && (
        <ToolbarGroup>
          <ThemeToggle />
        </ToolbarGroup>
      )}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({
  className,
  contentClass,
  showThemeToggle = true,
  content,
}: {
  className?: string;
  contentClass?: string;
  showThemeToggle?: boolean;
  content: any;
}) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  );
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [showAiWidget, setShowAiWidget] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const {
    setEditContent,
    newNote,
    setNewNote,
    editContent,
    setContentUpdated,
    currentNote,
  } = useAppStore();

  // Auto-save hook
  const { isSaving, forceSave } = useAutoSave(2000); // 2 second debounce
  const { completion, generateCompletion, isLoading: isAILoading } = useAICompletion({
    onError(error) {
      console.error({ error: `AI completion failed: ${error.message}` });
      setShowAiWidget(false);
    },
    onSuccess(completion) {
      console.log({ message: `AI completion went correctly: ${completion}` });
      setAiSuggestion(completion);
      setShowAiWidget(true);
    },
  });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: forceSave,
  });

  // AI suggestion handlers
  const handleAcceptSuggestion = () => {
    if (!editor || !aiSuggestion) return;

    const { from } = editor.state.selection;
    editor.chain()
      .focus()
      .insertContentAt(from, aiSuggestion)
      .run();

    setAiSuggestion("");
    setShowAiWidget(false);
  };

  const handleRejectSuggestion = () => {
    setAiSuggestion("");
    setShowAiWidget(false);
  };

  const handleTriggerAI = async () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(0, from);

    setShowAiWidget(true);
    await generateCompletion(text.slice(-100)); // Use last 100 chars as context
  };

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        autocomplete: "on",
        autocorrect: "off",
        autocapitalize: "on",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: content || "",
    onUpdate(props) {
      // generateCompletion(props.editor.$doc.textContent);
      if (props && props.editor?.isFocused) {
        console.log({
          before: props.editor.$doc?.from,
          after: props.editor?.$doc.textContent.trim(),
        });

        if (props.editor?.$doc.size !== currentNote?.size!) {
          setContentUpdated(true);
        }
        if (newNote) {
          setNewNote({
            ...newNote,
            size: props.editor?.$doc.content.size,
            content: props.editor?.$doc.content.toJSON(),
          });
        }
        if (editContent) {
          setEditContent(props.editor?.$doc.content.toJSON());
        }
      }
    },
  });

  // editor?.once("mount", ()=>{
  //   editor;
  // })

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  // AI suggestion keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + Space: Trigger AI completion
      if (modKey && e.code === "Space") {
        e.preventDefault();
        handleTriggerAI();
      }

      // Tab: Accept suggestion (only if widget is visible)
      if (e.key === "Tab" && showAiWidget && aiSuggestion) {
        e.preventDefault();
        handleAcceptSuggestion();
      }

      // Escape: Reject suggestion
      if (e.key === "Escape" && showAiWidget) {
        e.preventDefault();
        handleRejectSuggestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAiWidget, aiSuggestion, editor]);

  return (
    <div className={cn("simple-editor-wrapper", className)}>
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
              showThemeToggle={showThemeToggle}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className={cn("simple-editor-content", contentClass)}
        />
        
        {/* AI Suggestion Widget */}
        {showAiWidget && (
          <AISuggestionWidget
            editor={editor}
            suggestion={aiSuggestion}
            isLoading={isAILoading}
            onAccept={handleAcceptSuggestion}
            onReject={handleRejectSuggestion}
          />
        )}
      </EditorContext.Provider>
    </div>
  );
}
