import { useAppStore } from "@/store/app.store";
import { Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";

export const NoteHeader = () => {
  const { currentNote, newNote, setNewNote } = useAppStore();
  const [newNoteData, setNewNoteData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setNewNoteData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // @ts-ignore
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  if (!newNote && !currentNote) {
    return null;
  }
  return (
    <div className="w-full h-auto flex flex-col items-start border-[4px] border-b-muted border-x-0 border-t-0 pb-6">
      <div className="flex flex-col w-full h-full gap-4">
        {newNote ? (
          <input
            value={newNoteData.title}
            name="title"
            placeholder="Enter a title…"
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="dark:placeholder:text-[#F3F5F8] placeholder:text-[#2B303B] bg-transparent outline-none border-none text-[24px] font-bold"
          />
        ) : (
          <h1 className="text-[24px] text-neutral-950 dark:text-white capitalize">
            {currentNote?.title}
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
            {newNote ? (
              <input
                value={newNoteData.tags}
                name="tags"
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                className="dark:placeholder:text-[#99A0AE] placeholder:text-[#99A0AE] bg-transparent outline-none border-none text-[14px] p-1 border-[1px] rounded-md w-full"
              />
            ) : (
              <span className="flex items-center gap-2 text-[14px]">
                {currentNote?.tags.map((item, index) => (
                  <span className="capitalize" key={`${item}-${index}`}>
                    {/* TODO: Ensure that ts passes here later. */}
                    {item},{" "}
                  </span>
                ))}
              </span>
            )}
            {!newNote ? (
              <p className="flex items-center gap-2 text-[14px]">
                {currentNote?.updatedAt.toDateString().split(" ") &&
                  `${currentNote?.updatedAt.toDateString().split(" ")[2]} ${
                    currentNote?.updatedAt.toDateString().split(" ")[1]
                  } ${currentNote?.updatedAt.toDateString().split(" ")[3]}`}
              </p>
            ) : (
              <p className="text-[14px] dark:text-[#99A0AE] text-[#99A0AE] pl-1">
                Not yet saved
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
