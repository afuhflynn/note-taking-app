import { Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { useState, useTransition } from "react";
import { searchParamsSchema } from "../nuqs";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryStates(searchParamsSchema);

  const { query } = params;
  return (
    <div className="w-[300px] h-[44px] p-[16px] px-[14px] gap-[8px] flex items-center rounded-[8px] border">
      <Search className="text-neutral-500 size-[20px]" />
      <input
        name="search-query"
        placeholder="Search by title, content, or tags..."
        value={query as string || ""}
        onChange={(e) =>
          setParams(
            {
              query: e.target.value,
            },
            {
              limitUrlUpdates: e.target.value ? debounce(600) : undefined,
              shallow: false,
            }
          )
        }
        type="text"
        className="border-none p-0 focus-visible:ring-0 bg-transparent focus:outline-none ring-offset-0 appearance-none flex-1 text-lg placeholder:text-sm"
      />
    </div>
  );
};
