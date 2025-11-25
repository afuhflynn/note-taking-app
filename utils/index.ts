// generate slug

export function generateSlug(value: string) {
  return value.replaceAll(" ", "-");
}

// parse date
export function parseDate(date: string | Date) {
  const newDate = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(newDate);
}

export function constrcutParams(values: Record<string, string>) {
  const queryString = Object.entries(values)
    .map(([key, value], index) =>
      value !== null ? `${index > 0 ? "&" : ""}${key}=${value}` : ""
    )
    .toString();

  return queryString.replaceAll(",", "");
}

export function parseEditorContent(content: any) {
  // check if content is already strcutured correctly.
  if (content && typeof content == "object" && content["type"] !== undefined) {
    return content;
  }
  return {
    type: "doc",
    content: content || [],
  };
}

export function parseTags(tags: string) {
  return (
    tags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0) || []
  );
}

export { highlightMatches, getHighlightSnippet } from "./highlight-utils";
