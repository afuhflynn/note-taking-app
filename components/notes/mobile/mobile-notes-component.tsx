"use client";

import { Suspense, useState } from "react";
import { AllNotes } from "../all-notes";
import { NoteCanvas } from "../note-canvas";
import { Controls } from "../controls";
import { MobileTopBar } from "./mobile-top-bar";
import { CustomLoader2 } from "../../loader";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../../nuqs";

type MobileView = "notes" | "editor" | "settings";

export const MobileNotesComponent = () => {
  const [view, setView] = useState<MobileView>("notes");
  const [params] = useQueryStates(searchParamsSchema);
  const { id: currentNoteId } = params;

  return (
    <Suspense fallback={<CustomLoader2 />}>
      <div className="w-full h-full flex flex-col bg-background">
        {/* Mobile Top Bar */}
        <MobileTopBar currentView={view} />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {view === "notes" && (
            <>
              {/* Notes List View */}
              <div className="flex-1 overflow-auto">
                <AllNotes />
              </div>

              {/* Quick actions footer */}
              <div className="border-t bg-muted/30 p-3 flex gap-2">
                <button
                  onClick={() => setView("editor")}
                  disabled={!currentNoteId}
                  className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => setView("settings")}
                  className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted"
                >
                  Settings
                </button>
              </div>
            </>
          )}

          {view === "editor" && (
            <>
              {/* Editor View */}
              <div className="flex-1 overflow-auto">
                <NoteCanvas />
              </div>

              {/* Editor Controls */}
              <div className="border-t bg-muted/30 p-3">
                <Controls />
              </div>
            </>
          )}

          {view === "settings" && (
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Settings will be implemented in the next phase.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Footer */}
        <div className="border-t bg-background flex gap-1 p-2">
          <button
            onClick={() => setView("notes")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              view === "notes"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setView("editor")}
            disabled={!currentNoteId}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              view === "editor"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setView("settings")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              view === "settings"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Settings
          </button>
        </div>
      </div>
    </Suspense>
  );
};
