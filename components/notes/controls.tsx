import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";
import { DeleteNoteDialog } from "../dialogs/delete-note-dialog";
import { ArchiveNoteDialog } from "../dialogs/archive-note-dialog";
import { RestoreNoteDialog } from "../dialogs/restore-note-dialog";

export const Controls = () => {
  const [params] = useQueryStates(searchParamsSchema);

  const { filter } = params;

  // console.log({ currentNote });
  return (
    <div className="scroll-view w-[258px] h-full overflow-auto padding p-[20px] !pr-0 flex flex-col items-center gap-[12px] !pt-12">
      {filter === "archived" && <RestoreNoteDialog />}
      {filter !== "archived" && <ArchiveNoteDialog />}
      <DeleteNoteDialog />
    </div>
  );
};
