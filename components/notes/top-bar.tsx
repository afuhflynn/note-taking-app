import { navItems } from "@/lib/constants";
import { SearchBar } from "./search";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const TopBar = () => {
  const pathName = usePathname();
  return (
    <header className="w-full flex items-center justify-between px-[32px] items-between h-[81px] py-2 border border-b-muted border-x-0 border-t-0">
      {navItems.map(
        (item) =>
          item.href === pathName && (
            <h1
              className="font-inter-18pt-bold text-2xl text-neutral-950 dark:text-white"
              key={item.id}
            >
              {item.title}
            </h1>
          )
      )}
      <div className="flex items-center gap-[16px]">
        <SearchBar />
        <Button variant={"ghost"} className="rounded-lg" size={"icon"} asChild>
          <Link href={"/settings"}>
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
