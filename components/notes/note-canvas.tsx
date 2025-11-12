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
      <div className="w-full h-full flex flex-col items-start">
        <div className="w-full flex flex-col items-start border border-b-muted border-x-0 border-t-0 pb-2">
          {currentNote && currentNote.id ? (
            <div className="flex flex-col w-full h-full gap-4">
              <h1 className="font-inter-18pt-bold text-2xl text-neutral-950 dark:text-white capitalize">
                {currentNote?.title}
              </h1>
              <div className="flex items-start flex-col w-full h-auto gap-4">
                <div className="w-full flex items-start justify-between">
                  <span className="flex items-center gap-2 w-[26%%]">
                    <Tag className="w-4 h-4" /> Tags
                  </span>
                  <span className="w-[77%] ">
                    {currentNote?.tags.map((item, index) => (
                      <span className="capitalize" key={`${item}-${index}`}>
                        {item},{" "}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="w-full flex items-start justify-between text-left">
                  <span className="flex items-center gap-2 w-[26%]">
                    <Clock className="w-4 h-4" /> Last edited
                  </span>
                  <p className="text-neutral-700 dark:text-neutral-200 font-light text-lg w-[84%]">
                    {currentNote?.updatedAt.toDateString().split(" ") &&
                      `${currentNote?.updatedAt.toDateString().split(" ")[2]} ${
                        currentNote?.updatedAt.toDateString().split(" ")[1]
                      } ${currentNote?.updatedAt.toDateString().split(" ")[3]}`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="font-inter-18pt-regular text-sm text-neutral-950 dark:text-white capitalize font-light">
              No note selected. Select a note to read, edit, ...
            </p>
          )}
        </div>
        {/* Text editor */}
        <div className="w-full h-full py-4">
          {currentNote && currentNote.id ? (
            <textarea
              className="w-full h-full bg-transparent text-neutral-900 dark:text-white font-inter-16pt-regular outline-none resize-none scroll-m-0"
              placeholder="No content available."
            />
          ) : (
            <p className="text-neutral-500">No content available.</p>
          )}
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-between relative">
        <ActionBar />
      </div>
    </div>
  );
};
