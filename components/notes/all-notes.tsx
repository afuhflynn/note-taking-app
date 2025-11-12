"use client";

import { dummyNoteItems } from "@/constants";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/app.store";

export const AllNotes = () => {
  const { setCurrentNote } = useAppStore();
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const currentNoteId = searchParam.get("id");
  // console.log(pathName, currentNote?.replace(/["-"]/g, " "));

  return (
    <div className="w-[290px] h-full border-left padding flex flex-col gap-[16px]">
      <div className="flex flex-col w-full border border-b-muted border-x-0 border-t-0 pb-2">
        <Button
          className={`flex items-center justify-center w-full h-[41px] rounded-[8px] px-[16px] py-[12px] gap-[8px]`}
          size={"lg"}
        >
          <h4 className="text-white flex items-center text-center gap-2">
            <span className="font-semibold text-2xl">+</span> Create New Note
          </h4>
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-[4px] overflow-auto scroll-view">
        {dummyNoteItems.map((item) => (
          <Link
            key={item.id}
            onClick={() => setCurrentNote(item)}
            prefetch
            href={`${pathName}?note=${item.title
              .toLowerCase()
              .trim()
              .replace(/[" "]/g, "-")}&id=${item.id}`}
            className={`h-auto w-full rounded-[6px] p-[8px] gap-[12px] flex flex-col items-start ${
              item.id === currentNoteId
                ? "bg-neutral-100 dark:bg-neutral-800"
                : ""
            } border border-b-muted border-x-0 border-t-0 last:border-b-0`}
          >
            <h3 className="text-neutral-950 dark:text-white">{item.title}</h3>
            <div className="flex items-center gap-[4px]">
              {item.tags.map((item) => (
                <span
                  key={item}
                  className="text-neutral-950 dark:text-white font-light rounded-[4px] bg-neutral-200 dark:bg-neutral-600 px-[6px] py-[2px] capitalize"
                >
                  {item.toLowerCase()}
                </span>
              ))}
            </div>
            <p className="text-neutral-700 dark:text-neutral-200 font-light text-lg">
              {item.updatedAt.toDateString().split(" ") &&
                `${item.updatedAt.toDateString().split(" ")[2]} ${
                  item.updatedAt.toDateString().split(" ")[1]
                } ${item.updatedAt.toDateString().split(" ")[3]}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
