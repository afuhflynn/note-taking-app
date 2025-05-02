"use client";

import { useMobile } from "@/hooks/use-mobile";
import { MobileNotesComponent } from "./mobile/mobile-notes-component";
import { NotesComponent } from "./notes-component";
import { useUserStore } from "@/store/user.store";

export const NotesWrapper = () => {
  const { user } = useUserStore();
  const isMobile = useMobile();
  // Toggle layout based on device size
  console.log(user);
  return (
    <div className="w-full h-full">
      {isMobile ? <MobileNotesComponent /> : <NotesComponent />}
    </div>
  );
};
