import { navItems } from "@/constants";
import { SearchBar } from "./search";
import { usePathname, useSearchParams } from "next/navigation";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Suspense } from "react";

export const TopBar = () => {
  const pathName = usePathname();
  const params = useSearchParams();

  const tag = params.get("tag");
  return (
    <Suspense fallback={null}>
      <header className="w-full flex items-center justify-between px-[32px] items-between h-[81px] py-2 border border-b-muted border-x-0 border-t-0">
        {!tag ? (
          navItems.map(
            (item) =>
              item.href === pathName && (
                <h1
                  className="text-2xl text-neutral-950 dark:text-white"
                  key={item.id}
                >
                  {item.title}
                </h1>
              )
          )
        ) : (
          <h1 className="text-2xl text-neutral-950 dark:text-white">
            Notes Tagged:{" "}
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
