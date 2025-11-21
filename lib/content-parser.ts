/**
 * Content Parser Utility
 * Extracts plain text from Tiptap JSON content for efficient searching
 */

interface TiptapNode {
  type: string;
  content?: TiptapNode[];
  text?: string;
  attrs?: Record<string, any>;
  marks?: Array<{ type: string; attrs?: Record<string, any> }>;
}

/**
 * Recursively extracts plain text from Tiptap JSON content
 * @param content - Tiptap JSON content
 * @returns Plain text string
 */
export function extractTextFromTiptapContent(content: any): string {
  if (!content) return "";

  // Handle string content (legacy or simple text)
  if (typeof content === "string") {
    return content;
  }

  // Handle Tiptap JSON structure
  if (typeof content === "object") {
    let text = "";

    // If it's a node with text property
    if (content.text) {
      text += content.text;
    }

    // If it has content array, recursively process
    if (Array.isArray(content.content)) {
      for (const node of content.content) {
        text += extractTextFromTiptapContent(node);
        // Add space between block-level elements
        if (isBlockNode(node.type)) {
          text += " ";
        }
      }
    }

    // If content itself is an array
    if (Array.isArray(content)) {
      for (const node of content) {
        text += extractTextFromTiptapContent(node);
      }
    }

    return text.trim();
  }

  return "";
}

/**
 * Checks if a node type is a block-level element
 */
function isBlockNode(type: string): boolean {
  const blockTypes = [
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "listItem",
    "blockquote",
    "codeBlock",
    "horizontalRule",
  ];
  return blockTypes.includes(type);
}

/**
 * Normalizes search query for better matching
 * @param query - Raw search query
 * @returns Normalized query
 */
export function normalizeSearchQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/[^\w\s]/g, ""); // Remove special characters
}

/**
 * Checks if content matches search query
 * @param content - Tiptap JSON content
 * @param query - Search query
 * @returns Boolean indicating match
 */
export function contentMatchesQuery(content: any, query: string): boolean {
  const plainText = extractTextFromTiptapContent(content);
  const normalizedText = normalizeSearchQuery(plainText);
  const normalizedQuery = normalizeSearchQuery(query);

  return normalizedText.includes(normalizedQuery);
}

/**
 * Extracts a snippet from content around the search query
 * @param content - Tiptap JSON content
 * @param query - Search query
 * @param snippetLength - Length of snippet (default: 150 characters)
 * @returns Text snippet with context
 */
export function extractSearchSnippet(
  content: any,
  query: string,
  snippetLength: number = 150
): string {
  const plainText = extractTextFromTiptapContent(content);
  const normalizedText = plainText.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  const index = normalizedText.indexOf(normalizedQuery);

  if (index === -1) {
    // Query not found, return beginning of text
    return plainText.substring(0, snippetLength) + "...";
  }

  // Calculate snippet boundaries
  const start = Math.max(0, index - Math.floor(snippetLength / 2));
  const end = Math.min(plainText.length, start + snippetLength);

  let snippet = plainText.substring(start, end);

  // Add ellipsis if needed
  if (start > 0) snippet = "..." + snippet;
  if (end < plainText.length) snippet = snippet + "...";

  return snippet;
}

/**
 * Highlights search query in text
 * @param text - Plain text
 * @param query - Search query
 * @returns Text with highlighted query
 */
export function highlightQuery(text: string, query: string): string {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

/**
 * Parses content for database storage optimization
 * Extracts metadata and searchable text
 */
export function parseContentForStorage(content: any): {
  plainText: string;
  wordCount: number;
  characterCount: number;
  hasImages: boolean;
  hasLinks: boolean;
  hasCodeBlocks: boolean;
} {
  const plainText = extractTextFromTiptapContent(content);

  return {
    plainText,
    wordCount: plainText.split(/\s+/).filter(Boolean).length,
    characterCount: plainText.length,
    hasImages: checkForNodeType(content, "image"),
    hasLinks: checkForNodeType(content, "link"),
    hasCodeBlocks: checkForNodeType(content, "codeBlock"),
  };
}

/**
 * Checks if content contains a specific node type
 */
function checkForNodeType(content: any, nodeType: string): boolean {
  if (!content) return false;

  if (typeof content === "object") {
    if (content.type === nodeType) return true;

    if (Array.isArray(content.content)) {
      for (const node of content.content) {
        if (checkForNodeType(node, nodeType)) return true;
      }
    }

    if (content.marks) {
      for (const mark of content.marks) {
        if (mark.type === nodeType) return true;
      }
    }
  }

  if (Array.isArray(content)) {
    for (const node of content) {
      if (checkForNodeType(node, nodeType)) return true;
    }
  }

  return false;
}
