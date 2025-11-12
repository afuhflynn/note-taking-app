"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="w-[300px] h-[44px] p-[16px] px-[14px] gap-[8px] flex items-center rounded-[8px] border">
      <Search className="text-neutral-500 size-[20px]" />
      <input
        name="search-query"
        placeholder="Search by title, content, or tags..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="border-none p-0 focus-visible:ring-0 bg-transparent focus:outline-none ring-offset-0 appearance-none flex-1 text-sm"
      />
    </div>
  );
};
