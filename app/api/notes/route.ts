import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get all notes
export async function GET(_: NextRequest) {
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
    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },

      select: {
        title: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            tagId: true,
            noteId: true,
            name: true,
          },
        },
      },
    });

    if (!notes) {
      return NextResponse.json(
        {
          error: "No notes found!",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(notes);
  } catch (error: Error | any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An unexptected error occurred getting notes.",
        success: false,
      },
      { status: 500 }
    );
  }
}

// Create a new note
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { title, tags, content } = await request.json();

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
        success: false,
      },
      { status: 401 }
    );
  }

  if (!title || !title.trim()) {
    return NextResponse.json(
      {
        error: "At least a note title must be provided to create a note.",
        success: false,
      },
      { status: 400 }
    );
  }
  try {
    const tagsArray = tags.split(",") as string[];

    // create note and then create tags later.
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          error: "Cannot create note at the moment.",
          success: false,
        },
        { status: 500 }
      );
    }

    // create tags // TODO: Optimize this approach later.
    if (tagsArray.length > 0) {
      tagsArray.map(async (item) => {
        const tag = await prisma.tag.create({
          data: {
            name: item,
            noteId: note.id,
          },
        });

        if (!tag) {
          return NextResponse.json(
            {
              error: "Cannot create note at the moment.",
              success: false,
            },
            { status: 500 }
          );
        }
      });
    }

    return NextResponse.json(note, {
      status: 201,
    });
  } catch (error: Error | any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An unexptected error occurred creating note.",
        success: false,
      },
      { status: 500 }
    );
  }
}
