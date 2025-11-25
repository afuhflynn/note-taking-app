import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  createShareLink,
  getNoteShareLinks,
  deleteShareLink,
  updateSharePermission,
} from "@/lib/share-utils";
import {
  canManageShareLinks,
  isValidPermission,
  isNoteOwner,
} from "@/lib/permissions";

// GET /api/share?noteId=xxx - Get all share links for a note
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const noteId = request.nextUrl.searchParams.get("noteId");

    if (!noteId) {
      return NextResponse.json(
        { error: "Note ID is required", success: false },
        { status: 400 }
      );
    }

    // Verify user can manage share links for this note
    const canManage = await canManageShareLinks(noteId, session.user.id);
    if (!canManage) {
      return NextResponse.json(
        {
          error: "You do not have permission to view share links for this note",
          success: false,
        },
        { status: 403 }
      );
    }

    const shares = await getNoteShareLinks(noteId, session.user.id);

    return NextResponse.json({ shares, success: true });
  } catch (error) {
    console.error("Error fetching share links:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to fetch share links",
        success: false,
      },
      { status: 500 }
    );
  }
}

// POST /api/share - Create a new share link
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { noteId, permission, expiresIn } = body;

    if (!noteId) {
      return NextResponse.json(
        { error: "Note ID is required", success: false },
        { status: 400 }
      );
    }

    // Validate permission
    if (permission && !isValidPermission(permission)) {
      return NextResponse.json(
        { error: "Invalid permission value", success: false },
        { status: 400 }
      );
    }

    // Verify user owns the note
    const isOwner = await isNoteOwner(noteId, session.user.id);
    if (!isOwner) {
      return NextResponse.json(
        {
          error: "You do not have permission to share this note",
          success: false,
        },
        { status: 403 }
      );
    }

    // Calculate expiration date if provided
    let expiresAt: Date | undefined;
    if (expiresIn) {
      expiresAt = new Date();
      const days = parseInt(expiresIn);
      if (isNaN(days) || days < 0) {
        return NextResponse.json(
          { error: "Invalid expiration days value", success: false },
          { status: 400 }
        );
      }
      expiresAt.setDate(expiresAt.getDate() + days);
    }

    const shareLink = await createShareLink({
      noteId,
      userId: session.user.id,
      permission: permission || "VIEW",
      expiresAt,
    });

    return NextResponse.json({ shareLink, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating share link:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to create share link",
        success: false,
      },
      { status: 500 }
    );
  }
}

// PATCH /api/share - Update share link permission
export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { shareToken, permission } = body;

    if (!shareToken || !permission) {
      return NextResponse.json(
        { error: "Share token and permission are required", success: false },
        { status: 400 }
      );
    }

    // Validate permission
    if (!isValidPermission(permission)) {
      return NextResponse.json(
        { error: "Invalid permission value", success: false },
        { status: 400 }
      );
    }

    // Verify ownership of the shared note
    const shareLink = await (
      await import("@/lib/share-utils")
    ).getShareLink(shareToken);

    if (!shareLink) {
      return NextResponse.json(
        { error: "Share link not found", success: false },
        { status: 404 }
      );
    }

    // Verify user owns the original note
    const isOwner =
      shareLink.note.user &&
      shareLink.note.user.email &&
      session.user.email === shareLink.note.user.email;

    if (!isOwner) {
      return NextResponse.json(
        {
          error: "You do not have permission to update this share link",
          success: false,
        },
        { status: 403 }
      );
    }

    const updated = await updateSharePermission(shareToken, permission);

    return NextResponse.json({ shareLink: updated, success: true });
  } catch (error) {
    console.error("Error updating share link:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to update share link",
        success: false,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/share?shareToken=xxx - Delete a share link
export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required", success: false },
      { status: 401 }
    );
  }

  try {
    const shareToken = request.nextUrl.searchParams.get("shareToken");

    if (!shareToken) {
      return NextResponse.json(
        { error: "Share token is required", success: false },
        { status: 400 }
      );
    }

    // Verify ownership before deletion
    const { getShareLink } = await import("@/lib/share-utils");
    const shareLink = await getShareLink(shareToken);

    if (!shareLink) {
      return NextResponse.json(
        { error: "Share link not found", success: false },
        { status: 404 }
      );
    }

    // Verify user owns the original note
    const isOwner =
      shareLink.note.user &&
      shareLink.note.user.email &&
      session.user.email === shareLink.note.user.email;

    if (!isOwner) {
      return NextResponse.json(
        {
          error: "You do not have permission to delete this share link",
          success: false,
        },
        { status: 403 }
      );
    }

    await deleteShareLink(shareToken, session.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting share link:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to delete share link",
        success: false,
      },
      { status: 500 }
    );
  }
}
