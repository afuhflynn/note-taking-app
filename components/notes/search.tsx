import { Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { searchParamsSchema } from "../nuqs";

export const SearchBar = () => {
  const [params, setParams] = useQueryStates(searchParamsSchema);

  return (
    <div className="w-[300px] h-[44px] p-[16px] px-[14px] gap-[8px] flex items-center rounded-[8px] border">
      <Search className="text-neutral-500 size-[20px]" />
      <input
        name="search-query"
        placeholder="Search by title, content, or tags..."
        value={params.query}
        onChange={(e) =>
          setParams(
            {
              query: e.target.value,
            },
            {
              limitUrlUpdates: e.target.value.trim()
                ? debounce(600)
                : undefined,
              shallow: false,
            },
          )
        }
        type="text"
        data-search-box
        className="border-none p-0 focus-visible:ring-0 bg-transparent focus:outline-none ring-offset-0 appearance-none flex-1 text-lg placeholder:text-sm"
      />
    </div>
  );
};
