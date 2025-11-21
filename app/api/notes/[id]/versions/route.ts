import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  getNoteVersions,
  getNoteVersion,
  restoreNoteVersion,
} from "@/lib/note-versioning";
import { prisma } from "@/lib/prisma";

// GET /api/notes/[id]/versions - Get all versions of a note
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    // Verify note belongs to user
    const note = await prisma.note.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Note not found", success: false },
        { status: 404 }
      );
    }

    const versions = await getNoteVersions(id);

    return NextResponse.json({ versions, success: true });
  } catch (error) {
    console.error("Error fetching note versions:", error);
    return NextResponse.json(
      { error: "Failed to fetch versions", success: false },
      { status: 500 }
    );
  }
}

// POST /api/notes/[id]/versions - Restore a specific version
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const { historyId } = await request.json();

    if (!historyId) {
      return NextResponse.json(
        { error: "Version ID is required", success: false },
        { status: 400 }
      );
    }

    // Verify note belongs to user
    const note = await prisma.note.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Note not found", success: false },
        { status: 404 }
      );
    }

    const restoredNote = await restoreNoteVersion(
      id,
      historyId,
      session.user.id
    );

    return NextResponse.json({
      note: restoredNote,
      success: true,
      message: "Note restored to selected version",
    });
  } catch (error) {
    console.error("Error restoring note version:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to restore version",
        success: false,
      },
      { status: 500 }
    );
  }
}
