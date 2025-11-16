import { SearchBar } from "./search";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";

export const TopBar = () => {
  const [params] = useQueryStates(searchParamsSchema);

  const { tag, filter } = params;

  return (
    <Suspense fallback={null}>
      <header className="w-full flex items-center justify-between px-[32px] items-between h-[81px] py-2 border border-b-muted border-x-0 border-t-0">
        {!tag ? (
          <h1 className="text-2xl text-neutral-950 dark:text-white">
            {filter && filter === "archived" ? "Archived Notes" : "All Notes"}
          </h1>
        ) : (
          <h1 className="text-2xl text-neutral-950 dark:text-white">
            <span className="text-neutral-600">Notes Tagged:</span>{" "}
            <span className="capitalize">{tag.replaceAll("-", " ")}</span>
          </h1>
        )}
        <div className="flex items-center gap-[16px]">
          <SearchBar />
          <Button
            variant={"ghost"}
            className="rounded-lg"
            size={"icon"}
            asChild
          >
            <Link href={"/settings"} prefetch>
              <Settings className="text-neutral-500 size-[24px]" />
            </Link>
          </Button>
        </div>
      </header>
    </Suspense>
  );
};
