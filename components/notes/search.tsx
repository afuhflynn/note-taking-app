import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-auto h-auto p-1 flex items-center">
      <Search className="absolute left-0" />
      <Input placeholder="Search by title, content, or tags..." />
    </div>
  );
};
