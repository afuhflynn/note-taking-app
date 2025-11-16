"use client";

import { ActionBar } from "./action-bar";
import { useAppStore } from "@/store/app.store";
import { NoteHeader } from "./note-header";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";
import content from "@/public/data/content.json";

export const NoteCanvas = () => {
  const { newNote, currentNote: note } = useAppStore();
  const [params, setParams] = useQueryStates(searchParamsSchema);

  const { id: currentNoteId } = params;

  if (!note && !newNote) {
    return (
      <div className="w-[588px] h-full flex-1 border-left padding md:pb-4 flex flex-col items-center justify-between !p-0">
        <SimpleEditor showThemeToggle={false} content={content} />
      </div>
    );
  }
  return (
    <div className="w-[588px] h-full flex-1 border-left padding md:pb-4 pb-2 flex flex-col items-center justify-between !pt-12">
      {/* Note header (details) */}
      <NoteHeader noteId={currentNoteId as string} />
      <div className="h-full w-full flex flex-col justify-between relative">
        {/* Text editor */}

        <div className="w-full h-auto max-h-[calc(100% - 218px)] flex-1 flex items-center flex-col overflow-auto">
          <SimpleEditor
            content={newNote?.content || note?.content}
            showThemeToggle={false}
            className="inner-editor-content"
          />
        </div>
        <ActionBar />
      </div>
    </div>
  );
};
