import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Full-Text Search Utility
 * Provides advanced search capabilities using PostgreSQL full-text search
 */

export interface SearchOptions {
  userId: string;
  query: string;
  archived?: boolean;
  tags?: string[];
  limit?: number;
  offset?: number;
  sortBy?: "relevance" | "date" | "title";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  id: string;
  title: string;
  content: any;
  searchableText: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: Array<{ tagId: string; name: string }>;
  relevance?: number;
  snippet?: string;
}

/**
 * Performs full-text search on notes using PostgreSQL tsvector
 */
export async function fullTextSearch(
  options: SearchOptions
): Promise<{ results: SearchResult[]; total: number }> {
  const {
    userId,
    query,
    archived = false,
    tags = [],
    limit = 20,
    offset = 0,
    sortBy = "relevance",
    sortOrder = "desc",
  } = options;

  try {
    // Prepare the search query for PostgreSQL
    const searchQuery = query.trim().split(/\s+/).filter(Boolean).join(" & "); // Use AND operator for all terms

    // Build the where clause
    const whereClause: any = {
      userId,
      archived,
    };

    // Add tag filter if provided
    if (tags.length > 0) {
      whereClause.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    // Use raw SQL for full-text search with ranking
    const results = await prisma.$queryRaw<SearchResult[]>`
      SELECT
        n.id,
        n.title,
        n.content,
        n."searchableText",
        n."createdAt",
        n."updatedAt",
        ts_rank(n.search_vector, to_tsquery('english', ${searchQuery})) as relevance,
        ts_headline('english', COALESCE(n."searchableText", ''), to_tsquery('english', ${searchQuery}),
          'MaxWords=50, MinWords=25, ShortWord=3, HighlightAll=FALSE, MaxFragments=1') as snippet
      FROM "Note" n
      WHERE
        n."userId" = ${userId}
        AND n.archived = ${archived}
        AND n.search_vector @@ to_tsquery('english', ${searchQuery})
        ${
          tags.length > 0
            ? Prisma.sql`AND EXISTS (
          SELECT 1 FROM "_NoteToTag" nt
          JOIN "Tag" t ON t."tagId" = nt."B"
          WHERE nt."A" = n.id AND t.name = ANY(${tags})
        )`
            : Prisma.empty
        }
      ORDER BY
        ${
          sortBy === "relevance"
            ? Prisma.sql`relevance`
            : sortBy === "date"
            ? Prisma.sql`n."updatedAt"`
            : Prisma.sql`n.title`
        }
        ${sortOrder === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    // Get total count
    const countResult = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count
      FROM "Note" n
      WHERE
        n."userId" = ${userId}
        AND n.archived = ${archived}
        AND n.search_vector @@ to_tsquery('english', ${searchQuery})
        ${
          tags.length > 0
            ? Prisma.sql`AND EXISTS (
          SELECT 1 FROM "_NoteToTag" nt
          JOIN "Tag" t ON t."tagId" = nt."B"
          WHERE nt."A" = n.id AND t.name = ANY(${tags})
        )`
            : Prisma.empty
        }
    `;

    const total = Number(countResult[0]?.count || 0);

    // Fetch tags for each result
    const resultsWithTags = await Promise.all(
      results.map(async (result) => {
        const tags = await prisma.tag.findMany({
          where: {
            notes: {
              some: {
                id: result.id,
              },
            },
          },
          select: {
            tagId: true,
            name: true,
          },
        });

        return {
          ...result,
          tags,
        };
      })
    );

    return {
      results: resultsWithTags,
      total,
    };
  } catch (error) {
    console.error("Full-text search error:", error);
    throw error;
  }
}

/**
 * Performs a simple search (fallback when full-text search is not available)
 */
export async function simpleSearch(
  options: SearchOptions
): Promise<{ results: SearchResult[]; total: number }> {
  const {
    userId,
    query,
    archived = false,
    tags = [],
    limit = 20,
    offset = 0,
  } = options;

  const whereClause: any = {
    userId,
    archived,
    OR: [
      {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        searchableText: {
          contains: query,
          mode: "insensitive",
        },
      },
    ],
  };

  if (tags.length > 0) {
    whereClause.tags = {
      some: {
        name: {
          in: tags,
        },
      },
    };
  }

  const [results, total] = await Promise.all([
    prisma.note.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        content: true,
        searchableText: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            tagId: true,
            name: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.note.count({ where: whereClause }),
  ]);

  return { results, total };
}

/**
 * Auto-detects and uses the best search method available
 */
export async function smartSearch(
  options: SearchOptions
): Promise<{ results: SearchResult[]; total: number }> {
  try {
    // Try full-text search first
    return await fullTextSearch(options);
  } catch (error) {
    console.warn(
      "Full-text search failed, falling back to simple search:",
      error
    );
    // Fall back to simple search
    return await simpleSearch(options);
  }
}
