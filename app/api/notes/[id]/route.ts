import { headers } from "next/headers";
import { publish } from "@/lib/pubsub";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug, parseEditorContent, parseTags } from "@/utils";
import { updateNoteSchema } from "@/zod/zod.schema";
import { NextRequest, NextResponse } from "next/server";
import { extractTextFromTiptapContent } from "@/lib/content-parser";
import { createNoteVersion } from "@/lib/note-versioning";

// get a single note based on it's id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        error: "Note ID is required",
        success: false,
      },
      { status: 400 },
    );
  }

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 },
    );
  }
  try {
    const note = await prisma.note.findUnique({
      where: {
        userId: session.user.id,
        id,
        archived: false,
      },

      select: {
        title: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        size: true,
        tags: {
          select: {
            tagId: true,
            name: true,
          },
        },
        content: true,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          error: "No note found!",
          success: false,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An unexptected error occurred getting note.",
        success: false,
      },
      { status: 500 },
    );
  }
}

// Update a note
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateNoteSchema.safeParse(body);

    if (!validatedData.success) {
      console.error(
        "Something went wrong: ",
        validatedData.error.message,
        "tags: ",
        body["tags"],
      );
      const error = JSON.parse(validatedData.error.message);
      return NextResponse.json(
        {
          error: error[0]?.message || "Validation failed",
          success: false,
        },
        { status: 400 },
      );
    }

    const { title, content, tags, size } = validatedData.data;

    // Process tags: split, trim, and filter empty strings
    const tagsArray = parseTags(tags || "");

    const slug = generateSlug(title!);

    const parsedContent = parseEditorContent(content);

    // Create note with tags in a transaction
    const updatedNote = await prisma.$transaction(async (tx) => {
      // Find or create tags
      const tagConnections = await Promise.all(
        tagsArray.map(async (tagName) => {
          // Use upsert to find existing tag or create new one
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {}, // If tag exists, don't update anything
            create: { name: tagName, userId: session.user.id },
          });
          return { tagId: tag.tagId };
        }),
      );

      // get all tags to disconnect the usr from and then reconnect to the newly created or connected tags from above.
      const allTags = await tx.tag.findMany();

      if (!allTags) {
        return undefined;
      }
      const tagDisconnections = allTags?.map((tag) => ({
        tagId: tag.tagId,
      }));

      // Update note and connect to tags
      const searchableText = extractTextFromTiptapContent(parsedContent);

      return await tx.note.update({
        where: {
          id,
        },
        data: {
          slug,
          title: title,
          content: parsedContent,
          searchableText,
          userId: session.user.id,
          size: size || 0,
          tags: {
            disconnect: tagDisconnections, //First disconnect from all tags
            connect: tagConnections, //  Connect to existing or newly created tags
          },
        },
        select: {
          title: true,
          id: true,
          createdAt: true,
          updatedAt: true,
          size: true,
          tags: {
            select: {
              tagId: true,
              name: true,
            },
          },
          content: true,
        },
      });
    });

    // Create version snapshot
    await createNoteVersion({
      noteId: id,
      userId: session.user.id,
      content: parsedContent,
      title: title!,
    });

    // Publish realtime event
    publish("noteUpdated", updatedNote);

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(`Error updating note: ${error}`);
    return NextResponse.json(
      {
        error: "An unexpected error occurred updating note.",
        success: false,
      },
      { status: 500 },
    );
  }
}

// Archive a note
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: {
        userId: session.user.id,
        id,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          error: "No note found!",
          success: false,
        },
        { status: 404 },
      );
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        archived: !note.archived,
      },
    });

    // Publish realtime event
    publish("noteArchived", updatedNote);

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(`Error archiving note: ${error}`);
    return NextResponse.json(
      {
        error: "An unexpected error occurred archiving note.",
        success: false,
      },
      { status: 500 },
    );
  }
}

// Delte a note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    const deltedNote = await prisma.note.delete({
      where: { id },
    });

    // Publish realtime event
    publish("noteDeleted", { id });

    return NextResponse.json(deltedNote, { status: 200 });
  } catch (error) {
    console.error(`Error deleting note: ${error}`);
    return NextResponse.json(
      {
        error: "An unexpected error occurred deleting note.",
        success: false,
      },
      { status: 500 },
    );
  }
}
