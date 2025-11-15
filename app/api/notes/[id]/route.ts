import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get a single note based on it's id
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        error: "Note ID is required",
        success: false,
      },
      { status: 400 }
    );
  }

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
        tags: {
          select: {
            tagId: true,
            name: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          error: "No note found!",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error: Error | any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An unexptected error occurred getting note.",
        success: false,
      },
      { status: 500 }
    );
  }
}
