import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get all notes
export async function GET(request: NextRequest) {
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

      include: {
        tags: true,
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
