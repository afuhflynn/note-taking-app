import { ActionBar } from "./action-bar";
import { AllNotes } from "./all-notes";
import { Controls } from "./controls";
import { NavBar } from "./navbar";
import { NoteCanvas } from "./note-canvas";
import { TopBar } from "./top-bar";

export const NotesComponent = () => {
  return (
    <div className="w-full h-full flex items-start justify-between">
      <NavBar />
      <section className="h-full flex flex-col items-start">
        <TopBar />
        <div className="h-full flex flex-col items-start justify-between">
          <AllNotes />
          <NoteCanvas />
          <Controls />
        </div>
      </section>
      <ActionBar />
    </div>
  );
};
