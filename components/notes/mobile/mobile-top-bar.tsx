"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "../search";

interface MobileTopBarProps {
  currentView: "notes" | "editor" | "settings";
}

export const MobileTopBar = ({ currentView }: MobileTopBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="border-b bg-background sticky top-0 z-40">
      <div className="flex items-center justify-between p-3 gap-2">
        {/* Brand/Title */}
        <h1 className="text-lg font-semibold truncate flex-1">
          {currentView === "notes" && "My Notes"}
          {currentView === "editor" && "Editor"}
          {currentView === "settings" && "Settings"}
        </h1>

        {/* Search Toggle */}
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-muted"
            aria-label="Open search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Search Bar - Expanded View */}
      {searchOpen && (
        <div className="p-3 border-t bg-muted/30 flex gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 rounded-lg hover:bg-muted"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
