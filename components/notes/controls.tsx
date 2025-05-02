import { Archive, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const Controls = () => {
  return (
    <div className="scroll-view w-[258px] h-full overflow-auto padding p-[20px] pr-0 flex flex-col items-center gap-[12px]">
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex items-center h-[44px] rounded-[8px] px-[16px] py-[12px] gap-[8px] w-full hover:bg-muted border"
      >
        <Archive className="h-5 w-5" />
        <span>Archive Note</span>
      </Button>
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex items-center h-[44px] rounded-[8px] px-[16px] py-[12px] gap-[8px] w-full hover:bg-muted border"
      >
        <Trash2 className="h-5 w-5" />
        <span>Delete Note</span>
      </Button>
    </div>
  );
};
