"use client";

import { useSearchParams } from "next/navigation";
import { ActionBar } from "./action-bar";
import { useEffect } from "react";
import { useAppStore } from "@/store/app.store";
import { Clock, Tag } from "lucide-react";
import { NoteHeader } from "./note-header";

export const NoteCanvas = () => {
  const { currentNote, fetchCurrentNote, newNote } = useAppStore();
  const searchParam = useSearchParams();
  const currentNoteId = searchParam.get("id");
  // console.log(pathName, currentNote?.replace(/["-"]/g, " "));
  useEffect(() => {
    fetchCurrentNote(currentNoteId as string);
  }, [currentNoteId, fetchCurrentNote]);
  return (
    <div className="w-[588px] h-full flex-1 border-left padding md:pb-4 pb-2 flex flex-col items-center justify-between !pt-12">
      {/* Note header (details) */}
      <NoteHeader />
      <div className="h-full w-full flex flex-col justify-between relative">
        {/* Text editor */}
        {(currentNote || newNote) && (
          <>
            <div className="w-full h-auto flex-1 py-4">
              <textarea
                className="w-full h-full bg-transparent text-neutral-900 dark:text-white font-inter-16pt-regular outline-none resize-none scroll-m-0 text-[14px] dark:placeholder:text-[#F3F5F8] placeholder:text-[#2B303B]"
                placeholder="Start typing your note here…"
              />
            </div>
            <ActionBar />
          </>
        )}
      </div>
    </div>
  );
};
