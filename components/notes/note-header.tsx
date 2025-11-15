import { useNote } from "@/hooks";
import { useAppStore } from "@/store/app.store";
import { parseDate } from "@/utils";
import { Clock, Tag } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  } = useAppStore();
  const { isPending, error } = useNote(noteId);

  // Refs for auto-focus
  const titleInputRef = useRef<HTMLInputElement>(null);
  const tagsInputRef = useRef<HTMLInputElement>(null);

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
      // TODO: Call your API to update the title
      // await updateNote(noteId, { title: editTitle });
      console.log("Saving title:", editTitle);
      // You might want to refetch the note or update local state here
    }
    setIsEditingTitle(false);
  };

  const saveTags = async () => {
    if (note && editTags.trim()) {
      // TODO: Call your API to update the tags
      // Parse the comma-separated string back to tags
      // await updateNote(noteId, { tags: editTags.split(',').map(t => t.trim()) });
      console.log("Saving tags:", editTags);
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

  return (
    <div className="w-full h-auto flex flex-col items-start border-[4px] border-b-muted border-x-0 border-t-0 pb-6">
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
            onBlur={saveTitle}
            onKeyDown={handleTitleKeyDown}
            className="dark:placeholder:text-[#F3F5F8] placeholder:text-[#2B303B] bg-transparent outline-none border-none text-[24px] font-bold border-b-2 border-blue-500"
          />
        ) : (
          <h1
            onDoubleClick={handleTitleClick}
            className="text-[24px] text-neutral-950 dark:text-white capitalize cursor-pointer hover:bg-muted/50 rounded px-2 py-1 -mx-2 transition-colors"
          >
            {note?.title}
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
                onBlur={saveTags}
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
                  note.tags.map((item, index) => (
                    <span key={`${item.name}-${index}`}>
                      {item.name}
                      {index < note.tags.length - 1 && ", "}
                    </span>
                  ))
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
