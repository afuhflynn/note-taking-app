"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNotesComponent } from "./mobile/mobile-notes-component";
import { NotesComponent } from "./notes-component";
import { MainLoader } from "../main-loader";
import { useEffect } from "react";
import { useUserData } from "@/hooks";
import { toast } from "sonner";

export const NotesWrapper = () => {
  const isMobile = useIsMobile();
  const { user, isPending, error, refetch, isRefetching } = useUserData();
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
