import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const { id } = await params;
    const { versionNumber } = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!versionNumber) {
      return NextResponse.json(
        { error: "Version number is required" },
        { status: 400 }
      );
    }

    // Check if user owns the note
    const note = await prisma.note.findUnique({
      where: { id },
      select: { userId: true, content: true },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (note.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch the version to restore
    const versionToRestore = await prisma.noteHistory.findFirst({
      where: {
        noteId: id,
        versionNumber,
      },
    });

    if (!versionToRestore) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    // Get the next version number
    const latestVersion = await prisma.noteHistory.findFirst({
      where: { noteId: id },
      orderBy: { versionNumber: "desc" },
    });

    const nextVersionNumber = (latestVersion?.versionNumber || 0) + 1;

    // Save current content as a new version before restoring
    if (note.content) {
      await prisma.noteHistory.create({
        data: {
          noteId: id,
          versionNumber: nextVersionNumber,
          contentSnapshot: JSON.stringify(note.content),
          userId: session.user.id,
        },
      });
    }

    // Parse the content to restore
    const contentToRestore = JSON.parse(versionToRestore.contentSnapshot);

    // Update the note with restored content
    const restoredNote = await prisma.note.update({
      where: { id },
      data: {
        content: contentToRestore,
        updatedAt: new Date(),
      },
      include: {
        tags: {
          select: {
            tagId: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      note: restoredNote,
      message: `Note restored to version ${versionNumber}`,
    });
  } catch (error) {
    console.error("Error restoring note:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
