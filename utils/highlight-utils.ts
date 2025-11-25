import React from "react";

/**
 * Highlights matching text within a string
 * Returns JSX with matched text wrapped in mark tags
 */
export function highlightMatches(
  text: string | null | undefined,
  query: string | null | undefined,
  className: string = "bg-yellow-200 dark:bg-yellow-700 font-semibold"
): React.ReactNode {
  if (!query || !text) return text;

  const cleanQuery = query.trim();
  if (cleanQuery.length === 0) return text;

  try {
    // Create regex for case-insensitive matching
    const regex = new RegExp(`(${cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");

    // Split text by matches and create array with normal and highlighted parts
    const parts = text.split(regex);

    return parts.map((part, index) => {
      // Check if part matches the query (case-insensitive)
      if (part && part.toLowerCase() === cleanQuery.toLowerCase()) {
        return React.createElement(
          "mark",
          {
            key: index,
            className: className,
          },
          part
        );
      }
      return part;
    });
  } catch (error) {
    console.error("Error highlighting text:", error);
    return text;
  }
}

/**
 * Extract a snippet of text around the first match
 * Useful for showing preview text with context
 */
export function getHighlightSnippet(
  text: string | null | undefined,
  query: string | null | undefined,
  snippetLength: number = 150
): string {
  if (!query || !text) return "";

  const cleanQuery = query.trim();
  if (cleanQuery.length === 0) return "";

  try {
    const index = text.toLowerCase().indexOf(cleanQuery.toLowerCase());
    if (index === -1) return text.substring(0, snippetLength) + "...";

    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + cleanQuery.length + 100);

    const snippet = text.substring(start, end);
    return (start > 0 ? "..." : "") + snippet + (end < text.length ? "..." : "");
  } catch (error) {
    console.error("Error extracting snippet:", error);
    return text.substring(0, snippetLength) + "...";
  }
}
