import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { generateSlug, parseEditorContent, parseTags } from "@/utils";
import { creatNoteSchema } from "@/zod/zod.schema";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { publish } from "@/lib/pubsub";
import { extractTextFromTiptapContent } from "@/lib/content-parser";

// Get all notes
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filter = searchParams.get("filter");
  const tag = searchParams.get("tag");

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 }
    );
  }

  // Construct the where filer and clause based on filters if available
  let where: Prisma.NoteWhereInput = {};
  where = {
    userId: session.user.id,
    archived: filter === "archived" ? true : false,
  };

  if (query && query.trim() !== "" && query !== null) {
    where.OR = [
      {
        title: {
          contains: query as string,
          mode: "insensitive",
        },
      },
      {
        tags: {
          some: {
            name: {
              in: (query as string)?.split(" ").map((item) => item.trim()),
            },
          },
        },
      },
      {
        searchableText: {
          contains: query as string,
          mode: "insensitive",
        },
      },
    ];
  }

  if (tag && tag.trim() !== "" && tag !== null) {
    where.AND = [
      {
        tags: {
          some: {
            name: {
              in: [tag],
            },
          },
        },
      },
    ];
  }

  try {
    const notes = await prisma.note.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        archived: true,
        createdAt: true,
        updatedAt: true,
        size: true,
        tags: {
          select: {
            tagId: true,
            name: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!notes || notes.length === 0) {
      return NextResponse.json(
        {
          error: "No notes found!",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred getting notes.",
        success: false,
      },
      { status: 500 }
    );
  }
}

// Create a new note
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    const { title, tags, content, size } = await request.json();

    const validatedData = creatNoteSchema.safeParse({
      title,
      tags,
      content,
      size,
    });

    if (!validatedData.success) {
      const error = JSON.parse(validatedData.error.message);
      return NextResponse.json(
        {
          error: error[0]?.message || "Validation failed",
          success: false,
        },
        { status: 400 }
      );
    }

    // Process tags: split, trim, and filter empty strings
    const tagsArray = parseTags(validatedData.data.tags!);

    const slug = generateSlug(validatedData.data.title.toLowerCase());

    // Check if slug already exists
    const noteWithSlug = await prisma.note.findUnique({
      where: { slug },
    });

    if (noteWithSlug) {
      return NextResponse.json(
        {
          error: "Note title already exists. Try again with another title.",
          success: false,
        },
        { status: 409 }
      );
    }

    const parsedContent = parseEditorContent(validatedData.data.content);

    // Create note with tags in a transaction
    const note = await prisma.$transaction(async (tx) => {
      // Find or create tags
      const tagConnections = await Promise.all(
        tagsArray.map(async (tagName) => {
          // Use upsert to find existing tag or create new one
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {}, // If tag exists, don't update anything
            create: { name: tagName },
          });
          return { tagId: tag.tagId };
        })
      );

      // Create note and connect to tags
      const searchableText = extractTextFromTiptapContent(parsedContent);

      const note = await tx.note.create({
        data: {
          slug,
          title: validatedData.data.title,
          content: parsedContent,
          searchableText,
          size: validatedData.data.size,
          userId: session.user.id,
          tags: {
            connect: tagConnections, // Connect to existing or newly created tags
          },
        },
        select: {
          title: true,
          id: true,
          createdAt: true,
          updatedAt: true,
          tags: {
            select: {
              tagId: true,
              name: true,
            },
          },
          content: true,
          size: true,
        },
      });
      // Publish realtime event for note creation
      publish("noteCreated", note);
      return note;
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);

    // Handle specific Prisma errors
    if ((error as any).code === "P2002") {
      return NextResponse.json(
        {
          error: "A note with this title already exists.",
          success: false,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred creating note.",
        success: false,
      },
      { status: 500 }
    );
  }
}
