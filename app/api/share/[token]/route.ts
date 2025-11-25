import { NextRequest, NextResponse } from "next/server";
import { getShareLink, addCollaborator } from "@/lib/share-utils";
import {
  checkSharedNoteAccess,
  canEditSharedNote,
  isValidPermission,
} from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { extractTextFromTiptapContent } from "@/lib/content-parser";

// GET /api/share/[token] - Get shared note by token
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const session = await auth.api.getSession({ headers: await headers() });

    // Check access permissions
    const accessCheck = await checkSharedNoteAccess(token, session?.user?.id);
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        { error: accessCheck.reason || "Access denied", success: false },
        { status: 403 }
      );
    }

    const sharedNote = await getShareLink(token);

    if (!sharedNote) {
      return NextResponse.json(
        { error: "Share link not found or expired", success: false },
        { status: 404 }
      );
    }

    // Add collaborator if user is logged in and not owner
    if (session?.user?.id && session.user.id !== sharedNote.note.user.email) {
      await addCollaborator(token, undefined, session.user.id);
    }

    return NextResponse.json({
      sharedNote,
      permission: accessCheck.permission,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching shared note:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to fetch shared note",
        success: false,
      },
      { status: 500 }
    );
  }
}

// POST /api/share/[token] - Join as collaborator or update note if EDIT permission
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const session = await auth.api.getSession({ headers: await headers() });

    // Check if this is a note update (content and title in body)
    const body = await request.json();
    const { userName, userId, content, title } = body;

    // If content is being updated, verify EDIT permission
    if (content !== undefined || title !== undefined) {
      const hasEditPermission = await canEditSharedNote(
        token,
        session?.user?.id
      );

      if (!hasEditPermission) {
        return NextResponse.json(
          { error: "You do not have permission to edit this note", success: false },
          { status: 403 }
        );
      }

      // Get the shared note and update the original note
      const sharedNote = await prisma.sharedNote.findUnique({
        where: { shareToken: token },
      });

      if (!sharedNote) {
        return NextResponse.json(
          { error: "Share link not found", success: false },
          { status: 404 }
        );
      }

      // Update the original note
      const searchableText = content
        ? extractTextFromTiptapContent(content)
        : undefined;

      const updatedNote = await prisma.note.update({
        where: { id: sharedNote.noteId },
        data: {
          ...(title !== undefined && { title }),
          ...(content !== undefined && { content }),
          ...(searchableText && { searchableText }),
        },
        select: {
          id: true,
          title: true,
          content: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        note: updatedNote,
        message: "Note updated successfully",
      });
    }

    // Otherwise, add as collaborator
    const collaborator = await addCollaborator(token, userName, userId);

    return NextResponse.json(
      { collaborator, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in share endpoint:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Operation failed",
        success: false,
      },
      { status: 500 }
    );
  }
}
