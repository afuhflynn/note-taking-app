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

export const RestoreNoteDialog = () => {
  const { currentNote } = useAppStore();
  const [open, onOpenChange] = useState(false);
  const { arhiveNote } = useArchiveNote();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"lg"}
          disabled={!currentNote}
          className="flex items-center justify-start h-[44px] w-full rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
        >
          <Image
            src="/icons/Refresh_Light.svg"
            alt="Refresh icon"
            width={20}
            height={20}
            className="dark:hidden"
          />
          <Image
            src="/icons/Refresh_Dark.svg"
            alt="Refresh icon"
            width={20}
            height={20}
            className="hidden dark:block object-cover"
          />

          <span>Restore Note</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="flex gap-6 flex-row items-start">
          <div className="h-[40px] w-[40px] rounded-[8px] bg-muted flex items-center justify-center">
            <Image
              src="/icons/Refresh_Light.svg"
              alt="Refresh icon"
              width={20}
              height={20}
              className="dark:hidden"
            />
            <Image
              src="/icons/Refresh_Dark.svg"
              alt="Refresh icon"
              width={20}
              height={20}
              className="hidden dark:block object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <DialogTitle>Restore Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore this note? You can archive it
              anytime.
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
            }}
          >
            Restore Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
