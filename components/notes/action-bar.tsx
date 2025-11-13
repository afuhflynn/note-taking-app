import { useCreateNote } from "@/hooks";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/app.store";
import { NewNotes } from "@/types/TYPES";
import { CustomLoader1 } from "../loader";
import { toast } from "sonner";

export const ActionBar = () => {
  const { newNote, setNewNote, setCurrentNote } = useAppStore();
  const { create, isPending } = useCreateNote(newNote as NewNotes);

  const handleCancelNote = () => {
    setNewNote(null);
    setCurrentNote(null);
  };

  const handleCreateNote = () => {
    if (!newNote?.title) {
      toast.error("At least a note title is required to create a note,");
    }

    create();
  };
  return (
    <div className="flex gap-4 sticky bg-background bottom-0 w-full flex-row items-center justify-start border-[3px] border-b-muted border-x-0 border-b-0 py-5">
      <Button
        className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px]"
        disabled={isPending}
        onClick={handleCreateNote}
      >
        {isPending ? <CustomLoader1 /> : "Save Note"}
      </Button>
      <Button
        variant={"secondary"}
        onClick={handleCancelNote}
        disabled={isPending}
        className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px]"
      >
        Cancel
      </Button>
    </div>
  );
};
