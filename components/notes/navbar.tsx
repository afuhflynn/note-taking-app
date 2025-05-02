import { dummyNotes, navItems } from "@/lib/constants";
import { NotesLogo } from "../ui/logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, Tag } from "lucide-react";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathName = usePathname();

  return (
    <nav className="h-full w-[18rem] flex flex-col border-left md:py-4 md:pr-4 pr-2 py-2 gap-6">
      <div className="border border-b-muted border-x-0 border-t-0 pb-4">
        <NotesLogo className="dark:fill-white" />
      </div>
      <div className="flex flex-col items-start gap-4 h-full w-full overflow-auto scroll-view">
        <div className="flex flex-col items-start w-full gap-[4px] border border-b-muted border-x-0 border-t-0 pb-4">
          {navItems.map((item, index) => (
            <Button
              asChild
              key={`${item.id}-${index}`}
              className={`flex items-center justify-start w-full rounded-[8px] px-[12px] py-[10px] gap-[8px]`}
              variant={pathName === item.href ? "secondary" : "ghost"}
              size={"lg"}
            >
              <Link
                href={item.href}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.Icon
                    className={`${
                      pathName === item.href ? "text-primary" : ""
                    } h-5 w-5`}
                  />{" "}
                  <span>{item.title}</span>
                </div>
                {pathName === item.href && <ChevronRight className="h-5 w-5" />}
              </Link>
            </Button>
          ))}
        </div>
        <h4 className="text-neutral-500 px-[8px] text-sm">Tags</h4>
        <div className="flex flex-col items-start w-full gap-[4px]">
          {dummyNotes.map((item, index) => (
            <Button
              key={`${item.id}-${index}`}
              className="flex items-center justify-start w-full h-[40px] rounded-[8px] px-[12px] py-[10px] gap-[12px] capitalize"
              variant={"ghost"}
            >
              <Tag className="h-5 w-5 rounded-md" />
              {item.tag}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
