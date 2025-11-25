import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const { id } = await params;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user owns the note
    const note = await prisma.note.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (note.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all versions
    const histories = await prisma.noteHistory.findMany({
      where: { noteId: id },
      select: {
        historyId: true,
        versionNumber: true,
        contentSnapshot: true,
        updatedAt: true,
        User: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { versionNumber: "desc" },
    });

    // Parse content snapshots
    const parsedHistories = histories.map((h) => ({
      id: h.historyId,
      versionNumber: h.versionNumber,
      contentSnapshot: JSON.parse(h.contentSnapshot),
      updatedAt: h.updatedAt,
      user: h.User,
    }));

    return NextResponse.json(parsedHistories);
  } catch (error) {
    console.error("Error fetching note history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
