import { useCreateNote, useUpdateNote } from "@/hooks";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/app.store";
import { NewNotes, UpdateNoteData } from "@/types/TYPES";
import { CustomLoader1 } from "../loader";

export const ActionBar = () => {
  const {
    newNote,
    setNewNote,
    setCurrentNote,
    editTitle,
    editTags,
    editContent,
    currentNote,
    contentUpdated,
  } = useAppStore();
  const { isPending, createAsync } = useCreateNote(newNote as NewNotes);
  const { updateAsync, isPending: isUpdatingNote } = useUpdateNote();

  const handleCancelNote = () => {
    setNewNote(null);
    setCurrentNote(null);
  };

  const handleSaveNote = async () => {
    if (newNote) {
      await createAsync();
    } else {
      await updateAsync({
        title: editTitle,
        tags: editTags,
        content: editContent,
        id: currentNote?.id as string,
        size: currentNote?.size!,
      });
    }
  };

  const isLoading = isPending || isUpdatingNote;
  return (
    <div className="flex bg-background h-[68px] z-20 absolute bottom-[3.2rem] gap-4 w-full items-center justify-start border-[2px] border-b-muted border-x-0 border-b-0 ">
      <Button
        className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px]"
        disabled={isLoading || !contentUpdated}
        onClick={handleSaveNote}
      >
        {isLoading ? <CustomLoader1 /> : "Save Note"}
      </Button>
      {newNote && (
        <Button
          variant={"secondary"}
          onClick={handleCancelNote}
          disabled={isLoading}
          className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px]"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};
