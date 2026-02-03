"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";
import { Suspense } from "react";
import { useNotes } from "@/hooks";
import { buildUrl, searchParamsSchema } from "../nuqs";
import { SingleParserBuilder, useQueryStates } from "nuqs";
import { parseDate, getHighlightSnippet } from "@/utils";
import { highlightMatches } from "@/utils/highlight-utils";
import { CurrentNote } from "@/types/TYPES";
import { useIsMobile } from "@/hooks/use-mobile";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

export const AllNotes = () => {
  const isMobile = useIsMobile();
  const { setCurrentNote, newNote, setNewNote } = useAppStore();
  const pathName = usePathname();
  const [params, setParams] = useQueryStates(searchParamsSchema);
  const router = useRouter();

  const { filter, id: currentNoteId, query, tag } = params;
  const { notes, isPending, error, refetch, isRefetching } = useNotes({
    filter,
    query,
    tag,
  });

  const handleCreateClick = () => {
    setNewNote({
      title: "",
    });
    setCurrentNote(null);
    setParams({
      id: null,
      filter: null,
      query: null,
    });
    router.prefetch("/notes");
  };
  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNewNote: handleCreateClick,
  });

  const handleNoteClick = ({ currentNote }: { currentNote: CurrentNote }) => {
    setNewNote(null);
    setCurrentNote(currentNote);
    router.prefetch("/notes");
  };

  return (
    <Suspense fallback={null}>
      <div
        className={`${isMobile ? "w-full" : "w-[290px]"} h-full border-left padding !pt-12 flex flex-col items-center gap-[16px]`}
      >
        <div className="flex flex-col w-full border border-b-muted border-x-0 border-t-0 pb-2">
          <Button
            className={`flex items-center justify-center w-[242px] h-[41px] rounded-[12px] px-[16px] py-[12px] gap-[8px]`}
            size={"lg"}
            onClick={handleCreateClick}
          >
            <h4 className="text-white flex items-center text-center gap-2">
              <span className="font-extralight text-xl">+</span> Create New Note
            </h4>
          </Button>
        </div>
        {newNote && (
          <div className="text-[16px] w-full flex items-center justify-center p-[8px] rounded-[6px] bg-secondary text-secondary-foreground font-bold capitalize">
            {newNote.title || "Untitled Note"}
          </div>
        )}
        {query && query.trim() !== "" ? (
          <div className="w-full h-auto mb-2">
            All notes matching {`”${query}”`} are displayed below.
          </div>
        ) : tag && tag.trim() !== "" ? (
          <div className="w-full h-auto mb-2">
            All notes with the {`”${tag.replaceAll("-", " ")}”`} tag are shown
            here.
          </div>
        ) : filter === "archived" ? (
          <div className="w-full h-auto mb-2">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </div>
        ) : null}
        {notes && notes.length > 0 ? (
          <div className="flex-1 flex flex-col gap-[4px] overflow-auto scroll-view">
            {notes.map((item) => (
              <Link
                key={item.id}
                onClick={() => handleNoteClick({ currentNote: item })}
                prefetch
                href={buildUrl(
                  pathName,
                  {
                    id: item.id as unknown as SingleParserBuilder<string>,
                  },
                  params,
                )}
                className={`min-h-[110px] h-auto w-[242] rounded-[6px] p-[8px] gap-[12px] flex flex-col items-start ${
                  item.id === currentNoteId
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : ""
                } border border-b-muted border-x-0 border-t-0 last:border-b-0`}
              >
                <h3 className="text-neutral-950 dark:text-white text-[16px] font-semibold">
                  {item.title}
                </h3>
                {query && query.trim() !== "" && (
                  <p className="text-neutral-600 dark:text-neutral-300 text-xs line-clamp-2">
                    {highlightMatches(
                      getHighlightSnippet(
                        typeof item.content === "string"
                          ? item.content
                          : JSON.stringify(item.content).substring(0, 300),
                        query,
                        80,
                      ),
                      query,
                      "bg-yellow-200 dark:bg-yellow-700 font-semibold",
                    )}
                  </p>
                )}
                <div className="flex items-center flex-wrap gap-[4px]">
                  {item.tags.map((item) => (
                    <span
                      key={item.tagId}
                      className="text-neutral-950 dark:text-white font-light rounded-[4px] bg-neutral-200 dark:bg-neutral-600 px-[6px] py-[2px]"
                    >
                      {item.name.replaceAll(" ", "-")}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-200 font-light text-lg text-[12px]">
                  {parseDate(item.updatedAt)}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full h-auto p-[8px] rounded-[8px] bg-[#F3F5F8] dark:bg-[#232530] text-[14px]">
            {query && query.trim() !== "" ? (
              <span>
                No notes match your search. Try a different keyword or{" "}
                <Link href="/notes" className="underline">
                  create a new note.
                </Link>
              </span>
            ) : tag && tag.trim() !== "" ? (
              <span>
                No notes found for the tag {`"${tag?.replaceAll("-", " ")}"`}.
                Try a different tag or{" "}
                <Link href="/notes" className="underline">
                  create a new note.
                </Link>
              </span>
            ) : filter === "archived" ? (
              <span>
                No notes have been archived yet. Move notes here for
                safekeeping, or{" "}
                <Link href="/notes" className="underline">
                  create a new note.
                </Link>
              </span>
            ) : (
              <span>
                You don’t have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </span>
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
};
