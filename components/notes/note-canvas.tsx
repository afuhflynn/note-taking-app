"use client";

import { useSearchParams } from "next/navigation";
import { ActionBar } from "./action-bar";
import { useEffect } from "react";
import { useAppStore } from "@/store/app.store";
import { Clock, Tag } from "lucide-react";

export const NoteCanvas = () => {
  const { currentNote, fetchCurrentNote } = useAppStore();
  const searchParam = useSearchParams();
  const currentNoteId = searchParam.get("id");
  // console.log(pathName, currentNote?.replace(/["-"]/g, " "));
  useEffect(() => {
    fetchCurrentNote(currentNoteId as string);
  }, [currentNoteId, fetchCurrentNote]);
  return (
    <div className="w-full flex-1 h-full border-left padding md:pb-4 pb-2 flex flex-col items-center">
      <div className="w-full flex flex-col items-start border border-b-muted border-x-0 border-t-0 pb-2">
        {currentNote && currentNote.id ? (
          <>
            <h1 className="font-inter-18pt-bold text-2xl text-neutral-950 dark:text-white capitalize">
              {currentNote?.title}
            </h1>
            <div className="flex items-start flex-col w-full h-auto gap-2">
              <div className="w-[50%] flex items-start justify-between">
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Tags
                </span>
                <span>
                  {currentNote?.tags.map((item, index) => (
                    <span className="capitalize" key={`${item}-${index}`}>
                      {item},{" "}
                    </span>
                  ))}
                </span>
              </div>
              <div className="w-[50%] flex items-start justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Last edited
                </span>
                <p className="text-neutral-700 dark:text-neutral-200 font-light text-lg">
                  {currentNote?.updatedAt.toDateString().split(" ") &&
                    `${currentNote?.updatedAt.toDateString().split(" ")[2]} ${
                      currentNote?.updatedAt.toDateString().split(" ")[1]
                    } ${currentNote?.updatedAt.toDateString().split(" ")[3]}`}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="font-inter-18pt-regular text-sm text-neutral-950 dark:text-white capitalize font-light">
            No note selected. Select a note to read, edit, ...
          </p>
        )}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-between relative">
        <ActionBar />
      </div>
    </div>
  );
};
