import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { smartSearch } from "@/lib/fulltext-search";

/**
 * Advanced search endpoint with full-text search capabilities
 * GET /api/search?q=query&tags=tag1,tag2&archived=false&limit=20&offset=0&sortBy=relevance&sortOrder=desc
 */
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const tagsParam = searchParams.get("tags");
    const archived = searchParams.get("archived") === "true";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const sortBy =
      (searchParams.get("sortBy") as "relevance" | "date" | "title") ||
      "relevance";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Search query is required", success: false },
        { status: 400 }
      );
    }

    const tags = tagsParam ? tagsParam.split(",").map((t) => t.trim()) : [];

    const { results, total } = await smartSearch({
      userId: session.user.id,
      query,
      archived,
      tags,
      limit,
      offset,
      sortBy,
      sortOrder,
    });

    return NextResponse.json({
      results,
      total,
      query,
      tags,
      limit,
      offset,
      success: true,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Search failed",
        success: false,
      },
      { status: 500 }
    );
  }
}
