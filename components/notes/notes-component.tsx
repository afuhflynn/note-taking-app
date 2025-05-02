import { Suspense } from "react";
import { AllNotes } from "./all-notes";
import { Controls } from "./controls";
import { NavBar } from "./navbar";
import { NoteCanvas } from "./note-canvas";
import { TopBar } from "./top-bar";
import { CustomLoader2 } from "../loader";

export const NotesComponent = () => {
  return (
    <Suspense fallback={<CustomLoader2 />}>
      <div className="w-full h-full flex items-start justify-between overflow-hidden">
        <NavBar />
        <section className="h-full w-full flex-1 flex flex-col items-start">
          <TopBar />
          <div className="flex items-start justify-between w-full h-full">
            <AllNotes />
            <NoteCanvas />
            <Controls />
          </div>
        </section>
      </div>
    </Suspense>
  );
};
