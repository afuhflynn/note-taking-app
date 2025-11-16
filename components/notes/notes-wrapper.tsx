"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNotesComponent } from "./mobile/mobile-notes-component";
import { NotesComponent } from "./notes-component";
import { MainLoader } from "../main-loader";
import { useEffect } from "react";
import { useNote, useUserData } from "@/hooks";
import { toast } from "sonner";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";

export const NotesWrapper = () => {
  const isMobile = useIsMobile();
  const [params] = useQueryStates(searchParamsSchema);

  const { id: currentNoteId } = params;
  useNote(currentNoteId as string);

  const { isPending, error } = useUserData();
  useEffect(() => {
    if (error) {
      toast.error(`${error.message} - ${error?.cause}`);
    }
  }, [error]);

  if (isPending) {
    return <MainLoader />;
  }
  return (
    <div className="w-full h-full">
      {isMobile ? <MobileNotesComponent /> : <NotesComponent />}
    </div>
  );
};
