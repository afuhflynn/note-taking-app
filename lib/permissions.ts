// lib/permissions.ts
// Permission checking utilities for notes sharing

import { prisma } from "@/lib/prisma";

export enum Permission {
  VIEW = "VIEW",
  EDIT = "EDIT",
}

interface PermissionCheckResult {
  hasAccess: boolean;
  permission?: Permission;
  reason?: string;
}

/**
 * Check if user can access a shared note
 */
export async function checkSharedNoteAccess(
  token: string,
  userId?: string
): Promise<PermissionCheckResult> {
  try {
    const sharedNote = await prisma.sharedNote.findUnique({
      where: { shareToken: token },
      include: {
        note: {
          select: { userId: true },
        },
        collaborators: {
          where: userId ? { userId } : undefined,
        },
      },
    });

    if (!sharedNote) {
      return { hasAccess: false, reason: "Share link not found" };
    }

    // Check if expired
    if (sharedNote.expiresAt && sharedNote.expiresAt < new Date()) {
      return { hasAccess: false, reason: "Share link has expired" };
    }

    // Owner always has full access
    if (userId === sharedNote.note.userId) {
      return { hasAccess: true, permission: Permission.EDIT };
    }

    // Check collaborator permission
    if (userId && sharedNote.collaborators.length > 0) {
      const collaborator = sharedNote.collaborators[0];
      return {
        hasAccess: true,
        permission: collaborator.permission as Permission,
      };
    }

    // Public access with shared note permission
    return {
      hasAccess: true,
      permission: sharedNote.permission as Permission,
    };
  } catch (error) {
    console.error("Permission check error:", error);
    return { hasAccess: false, reason: "Permission check failed" };
  }
}

/**
 * Check if user can edit a shared note
 */
export async function canEditSharedNote(
  token: string,
  userId?: string
): Promise<boolean> {
  const result = await checkSharedNoteAccess(token, userId);
  return result.hasAccess && result.permission === Permission.EDIT;
}

/**
 * Check if user owns the original note
 */
export async function isNoteOwner(
  noteId: string,
  userId: string
): Promise<boolean> {
  const note = await prisma.note.findFirst({
    where: { id: noteId, userId },
  });
  return !!note;
}

/**
 * Check if user can manage share links for a note
 */
export async function canManageShareLinks(
  noteId: string,
  userId: string
): Promise<boolean> {
  return isNoteOwner(noteId, userId);
}

/**
 * Validate permission value
 */
export function isValidPermission(value: string): value is Permission {
  return Object.values(Permission).includes(value as Permission);
}

/**
 * Get effective permission for a user on a shared note
 */
export async function getEffectivePermission(
  shareToken: string,
  userId?: string
): Promise<Permission | null> {
  const result = await checkSharedNoteAccess(shareToken, userId);
  return result.permission || null;
}
