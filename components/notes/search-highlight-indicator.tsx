"use client";

import React from "react";
import { useAppStore } from "@/store/app.store";
import { highlightMatches } from "@/utils/highlight-utils";

interface SearchHighlightIndicatorProps {
  content: any;
}

/**
 * Displays information about search matches in the current note
 * Shows count of matches and allows navigation between them
 */
export function SearchHighlightIndicator({
  content,
}: SearchHighlightIndicatorProps) {
  const { searchQuery } = useAppStore();

  if (!searchQuery || searchQuery.trim() === "") {
    return null;
  }

  // Extract text from editor content (if it's TipTap JSON format)
  const textContent =
    typeof content === "string"
      ? content
      : content?.content
      ? JSON.stringify(content).substring(0, 5000)
      : "";

  // Count matches
  const matches = textContent.match(
    new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
  );
  const matchCount = matches ? matches.length : 0;

  if (matchCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-xs bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200">
      <div className="flex items-center gap-1">
        <span className="font-semibold">{matchCount}</span>
        <span>{matchCount === 1 ? "match" : "matches"} found</span>
      </div>
      <span className="text-yellow-700 dark:text-yellow-300">
        Scroll to see highlighted text
      </span>
    </div>
  );
}
