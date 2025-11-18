import { Search } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useState, useEffect } from "react";
import { searchParamsSchema } from "../nuqs";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [params, setParams] = useQueryStates(searchParamsSchema);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setParams(
        {
          query: searchQuery,
        },
        {
          // limitUrlUpdates: searchQuery.trim() ? debounce(600) : undefined,
          shallow: false,
        }
      );
    }, 600);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, setParams]);

  return (
    <div className="w-[300px] h-[44px] p-[16px] px-[14px] gap-[8px] flex items-center rounded-[8px] border">
      <Search className="text-neutral-500 size-[20px]" />
      <input
        name="search-query"
        placeholder="Search by title, content, or tags..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="border-none p-0 focus-visible:ring-0 bg-transparent focus:outline-none ring-offset-0 appearance-none flex-1 text-lg placeholder:text-sm"
      />
    </div>
  );
};
