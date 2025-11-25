import { NotesLogo } from "../ui/logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { FontToggle } from "../font-toggle";
import { useTags } from "@/hooks";
import { useQueryStates, parseAsString, SingleParserBuilder } from "nuqs";
import { buildUrl, searchParamsSchema } from "../nuqs";

export const NavBar = () => {
  const pathName = usePathname();
  const { tags, isPending, error, refetch, isRefetching } = useTags();
  const [params, setParams] = useQueryStates(searchParamsSchema);

  const { tag, id: noteId, filter } = params;

  const navItems = [
    {
      id: "home",
      title: "All Notes",
      href: "/notes",
      isActive: !filter && !tag,
    },
    {
      id: "archived",
      title: "Archived Notes",
      href: "/notes",
      isActive: filter === "archived" && !tag,
    },
  ];

  return (
    <Suspense fallback={null}>
      <nav className="h-full w-[272px] flex flex-col border-left md:py-4 md:pr-4 pr-2 py-2 gap-6">
        <div className="border border-b-muted border-x-0 border-t-0 pb-4">
          <NotesLogo className="dark:fill-white" />
        </div>
        <div className="flex flex-col items-start gap-4 h-auto w-full overflow-auto scroll-view">
          <div className="flex flex-col items-start w-full gap-[4px] border border-b-muted border-x-0 border-t-0 pb-4">
            {navItems.map((item, index) => (
              <Button
                asChild
                key={`${item.id}-${index}`}
                className={`flex items-center justify-start w-[240px] h-[40px] rounded-[8px] px-[12px] py-[10px] gap-[8px] ${
                  item.isActive ? " bg-accent dark:bg-accent/50" : ""
                }`}
                variant={"ghost"}
                size={"lg"}
              >
                <Link
                  href={buildUrl(
                    item.href,
                    {
                      // @ts-ignore
                      filter: item.id === "archived" ? "archived" : null,
                      // @ts-ignore
                      tag: null,
                    },
                    params
                  )}
                  prefetch
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {item.id === "home" ? (
                      <>
                        {item.isActive ? (
                          <Image
                            src="/icons/Home_Active.svg"
                            alt="Home icon"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <>
                            <Image
                              src="/icons/Home_Light.svg"
                              alt="Home icon"
                              width={20}
                              height={20}
                              className="dark:hidden"
                            />
                            <Image
                              src="/icons/Home_Dark.svg"
                              alt="Home icon"
                              width={20}
                              height={20}
                              className="hidden dark:block"
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {item.isActive ? (
                          <Image
                            src="/icons/Archive_Active.svg"
                            alt="Arhive icon"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <>
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
                          </>
                        )}
                      </>
                    )}
                    <span>{item.title}</span>
                  </div>
                  {item.isActive && <ChevronRight className="h-5 w-5" />}
                </Link>
              </Button>
            ))}
          </div>
          <h4 className="text-neutral-500 px-[8px] text-sm">Tags</h4>
          {!isPending && tags && tags.length > 0 ? (
            <div className="flex flex-col items-start w-full flex-1 max-h-[calc(100% - 164px)] overflow-auto gap-[4px]">
              {tags.map((item, index) => (
                <Button
                  key={`${item.tagId}-${index}`}
                  className={`flex items-center justify-start w-full h-[40px] rounded-[8px] px-[12px] py-[10px] gap-[12px] capitalize ${
                    tag === item.name ? " bg-accent dark:bg-accent/50" : ""
                  }`}
                  variant={"ghost"}
                  asChild
                >
                  <Link
                    href={buildUrl(
                      pathName,
                      {
                        tag: item.name as unknown as
                          | SingleParserBuilder<string>
                          | undefined,
                      },
                      params
                    )}
                    className="flex items-center justify-between"
                    prefetch
                  >
                    <div className="flex items-center gap-2">
                      {tag && tag === item.name ? (
                        <Image
                          src="/icons/Tag_Active.svg"
                          alt="Tag icon"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <>
                          <Image
                            src="/icons/Tag_Dark.svg"
                            alt="Tag icon"
                            width={20}
                            height={20}
                            className="hidden dark:block"
                          />
                          <Image
                            src="/icons/Tag_Light.svg"
                            alt="Tag icon"
                            width={20}
                            height={20}
                            className="dark:hidden"
                          />
                        </>
                      )}
                      {item.name.replaceAll("-", " ")}
                    </div>
                    {tag && tag === item.name && (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          ) : (
            <div className="w-full h-auto text-center text-sm">
              No tags available. Start tracking your ideas.
            </div>
          )}
        </div>
        <FontToggle />
      </nav>
    </Suspense>
  );
};
