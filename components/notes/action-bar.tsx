import { AuthButton } from "../auth/button";
import { Button } from "../ui/button";

export const ActionBar = () => {
  return (
    <div className="flex gap-4 sticky bg-background bottom-0 w-full flex-row items-center justify-start border-[3px] border-b-muted border-x-0 border-b-0 py-5">
      <Button className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px]">
        Save Note
      </Button>
      <Button
        variant={"secondary"}
        className="px-[16px] py-[12px] gap-[8px] rounded-[8px] text-[14px]"
      >
        Cancel
      </Button>
    </div>
  );
};
