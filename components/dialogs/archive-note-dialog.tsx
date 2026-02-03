import { useAppStore } from "@/store/app.store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useArchiveNote } from "@/hooks";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

export const ArchiveNoteDialog = () => {
  const { currentNote } = useAppStore();
  const [open, onOpenChange] = useState(false);
  const [params, setParams] = useQueryStates(searchParamsSchema);
  const { arhiveNote } = useArchiveNote({
    filter: params.filter,
    query: params.query,
    tag: params.tag,
  });

  useKeyboardShortcuts({
    onArchive() {
      onOpenChange((prev) => !prev);
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild data-archive-note-dialog-trigger>
        <Button
          variant={"outline"}
          size={"lg"}
          disabled={!currentNote}
          className="flex items-center justify-start h-[44px] w-full rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
        >
          <Image
            src="/icons/Archive_Light.svg"
            alt="Arhive icon"
            width={20}
            height={20}
            className="dark:hidden"
          />
          <Image
            src="/icons/Archive_Dark.svg"
            alt="Arhive icon"
            width={20}
            height={20}
            className="hidden dark:block object-cover"
          />

          <span>Archive Note</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="flex gap-6 flex-row items-start">
          <div className=" rounded-[8px] p-2 bg-muted flex items-center justify-center">
            <Image
              src="/icons/Archive_Light.svg"
              alt="Arhive icon"
              width={24}
              height={24}
              className="dark:hidden"
            />
            <Image
              src="/icons/Archive_Dark.svg"
              alt="Arhive icon"
              width={30}
              height={30}
              className="hidden dark:block object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <DialogTitle>Archive Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive this note? You can find it in the
              Archived Notes section and restore it anytime.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator className="my-2" />
        <DialogFooter className="gap-4">
          <Button
            className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px] w-[78px] h-[41px]"
            variant={"secondary"}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px] w-[110px] h-[41px]"
            onClick={() => {
              arhiveNote(currentNote?.id!);
              onOpenChange(false);
              setParams({ ...params, id: null });
            }}
          >
            Archive Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
