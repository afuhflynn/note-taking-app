import { useNetworkStatus, useOnlineStatus } from "@/hooks/use-online-status";
import { useAppStore } from "@/store/app.store";
import { parseDate } from "@/utils";
import { Clock, Tag } from "lucide-react";
import { useRef, useEffect } from "react";
import { toast } from "sonner";

export const NoteHeader = ({ noteId }: { noteId: string }) => {
  const {
    newNote,
    setNewNote,
    isEditingTitle,
    isEditingTags,
    setEditTags,
    setEditTitle,
    setIsEditingTags,
    setIsEditingTitle,
    editTitle,
    editTags,
    currentNote: note,
    setContentUpdated,
  } = useAppStore();
  // Refs for auto-focus
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);
  const { isOnline, isChecking } = useNetworkStatus();

  useEffect(() => {
    if (isChecking) {
      console.log("Checking network status...");
    } else {
      console.log(`You are: ${isOnline ? "ONLINE" : "OFFLINE"}`, isOnline);
    }
  }, [isOnline]);
  // Auto-focus when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingTags && tagsInputRef.current) {
      tagsInputRef.current.focus();
    }
  }, [isEditingTags]);

  const handleInputChange = (name: string, value: string) => {
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleTitleClick = () => {
    if (note && !newNote) {
      setEditTitle(note.title);
      setIsEditingTitle(true);
    }
  };

  const handleTagsClick = () => {
    if (note && !newNote) {
      // Convert tags array to comma-separated string
      const tagsString = note.tags.map((tag) => tag.name).join(", ");
      setEditTags(tagsString);
      setIsEditingTags(true);
    }
  };

  const saveTitle = async () => {
    if (note && editTitle.trim()) {
      toast.info("Note title updated. Save to keep changes.");
    }

    if (note?.title.trim().toLowerCase() !== editTitle.trim().toLowerCase()) {
      setContentUpdated(true);
    } else {
      setContentUpdated(false);
    }
  };

  const saveTags = async () => {
    if (note && editTags.trim()) {
      toast.info("Note tags updated. Save to keep changes.");
    }

    if (
      note?.tags.join(", ").trim().toLowerCase() !==
      editTags.trim().toLowerCase()
    ) {
      setContentUpdated(true);
    } else {
      setContentUpdated(false);
    }
    setIsEditingTags(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTitle();
    } else if (e.key === "Escape") {
      setIsEditingTitle(false);
    }
  };

  const handleTagsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTags();
    } else if (e.key === "Escape") {
      setIsEditingTags(false);
    }
  };

  if (!note && !newNote) {
    return null;
  }

  return (
    <div className="w-full h-[142.15px] flex flex-col items-start border-[4px] border-b-muted border-x-0 border-t-0 pb-6">
      <div className="flex flex-col w-full h-full gap-4">
        {/* Title Section */}
        {newNote ? (
          <input
            value={newNote.title || ""}
            name="title"
            placeholder="Enter a title…"
            autoFocus
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="dark:placeholder:text-[#F3F5F8] placeholder:text-[#2B303B] bg-transparent outline-none border-none text-[24px] font-bold"
          />
        ) : isEditingTitle ? (
          <input
            ref={titleInputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            className="dark:placeholder:text-[#F3F5F8] placeholder:text-[#2B303B] bg-transparent outline-none border-none text-[24px] font-bold border-b-2 border-blue-500"
          />
        ) : (
          <h1
            onDoubleClick={handleTitleClick}
            className="text-[24px] text-neutral-950 dark:text-white cursor-pointer hover:bg-muted/50 rounded px-2 py-1 -mx-2 transition-colors w-auto"
          >
            {editTitle}
          </h1>
        )}

        <div className="flex h-auto w-full items-center gap-9">
          <div className="w-[115px] flex items-start flex-col gap-3">
            <span className="flex items-center gap-2 text-[14px]">
              <Tag className="w-4 h-4" /> Tags
            </span>
            <span className="flex items-center gap-2 text-[14px]">
              <Clock className="w-4 h-4" /> Last edited
            </span>
          </div>

          <div className="w-full flex-1 h-auto flex items-start flex-col gap-3">
            {/* Tags Section */}
            {newNote ? (
              <input
                value={newNote.tags || ""}
                name="tags"
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                className="dark:placeholder:text-[#99A0AE] placeholder:text-[#99A0AE] bg-transparent outline-none border-none text-[14px] p-1 border-[1px] rounded-md w-full"
              />
            ) : isEditingTags ? (
              <input
                ref={tagsInputRef}
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                onKeyDown={handleTagsKeyDown}
                placeholder="Add tags separated by commas"
                className="dark:placeholder:text-[#99A0AE] placeholder:text-[#99A0AE] bg-transparent outline-none text-[14px] p-1 border-[1px] border-blue-500 rounded-md w-full"
              />
            ) : (
              <span
                onDoubleClick={handleTagsClick}
                className="flex items-center gap-2 text-[14px] cursor-pointer hover:bg-muted/50 rounded px-2 py-1 -mx-2 transition-colors min-h-[28px]"
              >
                {note?.tags && note.tags.length > 0 ? (
                  // note.tags.map((item, index) => (
                  //   <span key={`${item.name}-${index}`}>
                  //     {item.name}
                  //     {index < note.tags.length - 1 && ", "}
                  //   </span>
                  // ))

                  <span>{editTags}</span>
                ) : (
                  <span className="text-muted-foreground italic">
                    Double-Click to add tags
                  </span>
                )}
              </span>
            )}

            {/* Last Edited Date */}
            {!newNote && note?.updatedAt ? (
              <p className="flex items-center gap-2 text-[14px]">
                {parseDate(note.updatedAt)}
              </p>
            ) : newNote ? (
              <p className="text-[14px] dark:text-[#99A0AE] text-[#99A0AE] pl-1">
                Not yet saved
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
