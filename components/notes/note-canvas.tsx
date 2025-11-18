"use client";

import { ActionBar } from "./action-bar";
import { useAppStore } from "@/store/app.store";
import { NoteHeader } from "./note-header";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";
import content from "@/public/data/content.json";

export const NoteCanvas = () => {
  const { newNote, currentNote: note, editContent } = useAppStore();
  const [params, setParams] = useQueryStates(searchParamsSchema);

  const { id: currentNoteId } = params;

  if (!note && !newNote) {
    return (
      <div className="w-[588px] h-full flex-1 max-h-[calc(100% - 142.15px)] overflow-hidden relative border-left padding md:pb-4 flex flex-col items-center justify-between !p-0">
        <SimpleEditor
          showThemeToggle={false}
          content={content}
          className="editor-wrapper"
          contentClass="editor-content"
        />
      </div>
    );
  }
  return (
    <div className="w-[588px] h-full flex-1 border-left padding !py-0 !pt-11 flex flex-col items-center justify-between">
      {/* Note header (details) */}
      <NoteHeader noteId={currentNoteId as string} />
      <div className="w-full flex-1 max-h-[calc(100% - 142.15px)] overflow-auto flex flex-col relative">
        {/* Text editor */}
        <SimpleEditor
          content={newNote?.content || note?.content}
          showThemeToggle={false}
          className="editor-wrapper"
          contentClass="editor-content"
        />
        {/* Actoin bar for saving notes and also cancelling */}
        <ActionBar />
      </div>
    </div>
  );
};
