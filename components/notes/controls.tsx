import { Archive, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";
import { useNote } from "@/hooks";
import { useAppStore } from "@/store/app.store";

export const Controls = () => {
  const [params, setParams] = useQueryStates(searchParamsSchema);
  const { currentNote } = useAppStore();

  console.log({ currentNote });
  return (
    <div className="scroll-view w-[258px] h-full overflow-auto padding p-[20px] !pr-0 flex flex-col items-center gap-[12px] !pt-12">
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex items-center justify-start h-[44px] w-full rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
      >
        <Image
          src="/icons/Refresh_Light.svg"
          alt="Refresh icon"
          width={20}
          height={20}
          className="dark:hidden"
        />
        <Image
          src="/icons/Refresh_Dark.svg"
          alt="Refresh icon"
          width={20}
          height={20}
          className="hidden dark:block object-cover"
        />

        <span>Restore Note</span>
      </Button>
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex items-center justify-start h-[44px] w-full rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
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
        className="flex items-center justify-start h-[44px] w-full rounded-[8px] px-[16px] py-[12px] gap-[8px] hover:bg-muted border"
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
