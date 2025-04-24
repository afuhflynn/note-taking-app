"use client";

import { useMobile } from "@/hooks/use-mobile";
import { MobileNotesComponent } from "./mobile/mobile-notes-component";
import { NotesComponent } from "./notes-component";

export const NotesWrapper = () => {
  const isMobile = useMobile();
  // Toggle layout based on device size
  return (
    <div className="w-full h-full overflow-auto">
      {isMobile ? <MobileNotesComponent /> : <NotesComponent />}
    </div>
  );
};
