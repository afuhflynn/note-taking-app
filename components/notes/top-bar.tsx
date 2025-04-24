import { SearchBar } from "./search";

export const TopBar = () => {
  return (
    <header className="w-full flex items-center justify-between">
      <h1 className="font-inter-18pt-bold text-2xl">All Notes</h1>
      <SearchBar />
    </header>
  );
};
