import { Archive, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export const Controls = () => {
  return (
    <div className="scroll-view w-[258px] h-full overflow-auto padding p-[20px] pr-0 flex flex-col items-center gap-[12px] !pt-12">
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex items-center justify-start h-[44px] w-[242px] rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
      >
        <Image
          src="/icons/Archive_Light.svg"
          alt="Arhive icon"
          width={20}
          height={20}
          className="dark:hidden"
        />
        <Image
          src="/icons/Archive_Dark.svg"
          alt="Arhive icon"
          width={20}
          height={20}
          className="hidden dark:block object-cover"
        />

        <span>Archive Note</span>
      </Button>
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex items-center justify-start h-[44px] w-[242px] rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
      >
        <Image
          src="/icons/Delete_Light.svg"
          alt="Delete icon"
          width={20}
          height={20}
          className="dark:hidden"
        />
        <Image
          src="/icons/Delete_Dark.svg"
          alt="Delete icon"
          width={20}
          height={20}
          className="hidden dark:block object-cover"
        />

        <span>Delete Note</span>
      </Button>
    </div>
  );
};
