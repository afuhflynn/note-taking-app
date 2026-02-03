import { useCreateNote, useUpdateNote } from "@/hooks";
import { Button } from "../ui/button";
import { ShareNoteDialog } from "@/components/dialogs/share-note-dialog";
import { VersionHistoryDialog } from "@/components/dialogs/version-history-dialog";
import { KeyboardShortcutsDialog } from "@/components/dialogs/keyboard-shortcuts-dialog";
import { useAppStore } from "@/store/app.store";
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
  const { isPending, createAsync } = useCreateNote();
  const { updateAsync, isPending: isUpdatingNote } = useUpdateNote();

  const handleCancelNote = () => {
    setNewNote(null);
    setCurrentNote(null);
  };

  const handleSaveNote = async () => {
    if (newNote) {
      await createAsync(newNote);
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
    <div className=" bg-background h-[70px] py-2 flex absolute bottom-[3.9rem] w-full items-center justify-between border-[2px] border-b-muted border-x-0 border-b-0 ">
      <div className="flex items-center gap-4">
        <Button
          className="px-[16px] w-[99px] h-[41px] py-[12px] gap-[8px] rounded-[8px] text-[14px]"
          disabled={isLoading || (currentNote && !contentUpdated)!}
          onClick={handleSaveNote}
        >
          {isLoading ? <CustomLoader1 /> : "Save Note"}
        </Button>
        {newNote && (
          <Button
            variant={"secondary"}
            onClick={handleCancelNote}
            disabled={isLoading}
            className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px] w-[78px] h-[41px]"
          >
            Cancel
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {currentNote && <ShareNoteDialog noteId={currentNote.id} />}
        {currentNote && <VersionHistoryDialog noteId={currentNote.id} />}
        <KeyboardShortcutsDialog />
      </div>
    </div>
  );
};
