import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";

// Generate a secure, URL-safe share token
const generateShareToken = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  16
);

export interface CreateShareLinkParams {
  noteId: string;
  userId: string;
  permission: "VIEW" | "EDIT";
  expiresAt?: Date;
}

export interface ShareLinkInfo {
  id: string;
  shareToken: string;
  shareUrl: string;
  permission: "VIEW" | "EDIT";
  expiresAt: Date | null;
  createdAt: Date;
}

/**
 * Creates a share link for a note
 */
export async function createShareLink(
  params: CreateShareLinkParams
): Promise<ShareLinkInfo> {
  const { noteId, userId, permission, expiresAt } = params;

  // Verify note belongs to user
  const note = await prisma.note.findUnique({
    where: { id: noteId, userId },
  });

  if (!note) {
    throw new Error("Note not found or access denied");
  }

  // Generate unique share token
  const shareToken = generateShareToken();

  // Create share record
  const sharedNote = await prisma.sharedNote.create({
    data: {
      noteId,
      shareToken,
      permission,
      expiresAt,
      createdBy: userId,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}/share/${shareToken}`;

  return {
    id: sharedNote.id,
    shareToken: sharedNote.shareToken,
    shareUrl,
    permission: sharedNote.permission,
    expiresAt: sharedNote.expiresAt,
    createdAt: sharedNote.createdAt,
  };
}

/**
 * Gets share link information
 */
export async function getShareLink(shareToken: string) {
  const sharedNote = await prisma.sharedNote.findUnique({
    where: { shareToken },
    include: {
      note: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      collaborators: {
        select: {
          id: true,
          userName: true,
          lastActiveAt: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!sharedNote) {
    return null;
  }

  // Check if expired
  if (sharedNote.expiresAt && sharedNote.expiresAt < new Date()) {
    return null;
  }

  return sharedNote;
}

/**
 * Updates share link permissions
 */
export async function updateSharePermission(
  shareToken: string,
  permission: "VIEW" | "EDIT"
) {
  return await prisma.sharedNote.update({
    where: { shareToken },
    data: { permission },
  });
}

/**
 * Deletes a share link
 */
export async function deleteShareLink(shareToken: string, userId: string) {
  // Verify ownership
  const sharedNote = await prisma.sharedNote.findUnique({
    where: { shareToken },
  });

  if (!sharedNote || sharedNote.createdBy !== userId) {
    throw new Error("Share link not found or access denied");
  }

  await prisma.sharedNote.delete({
    where: { shareToken },
  });
}

/**
 * Gets all share links for a note
 */
export async function getNoteShareLinks(noteId: string, userId: string) {
  // Verify note ownership
  const note = await prisma.note.findUnique({
    where: { id: noteId, userId },
  });

  if (!note) {
    throw new Error("Note not found or access denied");
  }

  const shares = await prisma.sharedNote.findMany({
    where: { noteId },
    include: {
      collaborators: {
        select: {
          id: true,
          userName: true,
          lastActiveAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return shares.map((share) => ({
    id: share.id,
    shareToken: share.shareToken,
    shareUrl: `${baseUrl}/share/${share.shareToken}`,
    permission: share.permission,
    expiresAt: share.expiresAt,
    createdAt: share.createdAt,
    collaboratorCount: share.collaborators.length,
  }));
}

/**
 * Adds a collaborator to a shared note
 */
export async function addCollaborator(
  shareToken: string,
  userName?: string,
  userId?: string
) {
  const sharedNote = await prisma.sharedNote.findUnique({
    where: { shareToken },
  });

  if (!sharedNote) {
    throw new Error("Share link not found");
  }

  // Check if already a collaborator
  const existing = await prisma.noteCollaborator.findFirst({
    where: {
      sharedNoteId: sharedNote.id,
      OR: [{ userId }, { userName }],
    },
  });

  if (existing) {
    // Update last active time
    return await prisma.noteCollaborator.update({
      where: { id: existing.id },
      data: { lastActiveAt: new Date() },
    });
  }

  // Create new collaborator
  return await prisma.noteCollaborator.create({
    data: {
      sharedNoteId: sharedNote.id,
      userId,
      userName,
      permission: sharedNote.permission,
    },
  });
}

/**
 * Updates collaborator activity
 */
export async function updateCollaboratorActivity(collaboratorId: string) {
  return await prisma.noteCollaborator.update({
    where: { id: collaboratorId },
    data: { lastActiveAt: new Date() },
  });
}
