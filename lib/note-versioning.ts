import { prisma } from "@/lib/prisma";

/**
 * Note Versioning Utility
 * Handles creating and managing note version history
 */

interface CreateVersionParams {
  noteId: string;
  userId: string;
  content: any;
  title: string;
}

/**
 * Creates a new version of a note in the history
 */
export async function createNoteVersion({
  noteId,
  userId,
  content,
  title,
}: CreateVersionParams): Promise<void> {
  try {
    // Get the current version number
    const latestVersion = await prisma.noteHistory.findFirst({
      where: { noteId },
      orderBy: { versionNumber: "desc" },
      select: { versionNumber: true },
    });

    const nextVersionNumber = (latestVersion?.versionNumber || 0) + 1;

    // Create the version snapshot
    await prisma.noteHistory.create({
      data: {
        noteId,
        userId,
        versionNumber: nextVersionNumber,
        contentSnapshot: JSON.stringify({
          content,
          title,
          timestamp: new Date().toISOString(),
        }),
      },
    });
  } catch (error) {
    console.error("Error creating note version:", error);
    throw error;
  }
}

/**
 * Gets all versions of a note
 */
export async function getNoteVersions(noteId: string) {
  try {
    const versions = await prisma.noteHistory.findMany({
      where: { noteId },
      orderBy: { versionNumber: "desc" },
      select: {
        historyId: true,
        versionNumber: true,
        contentSnapshot: true,
        updatedAt: true,
      },
    });

    return versions.map((version) => ({
      ...version,
      contentSnapshot: JSON.parse(version.contentSnapshot),
    }));
  } catch (error) {
    console.error("Error getting note versions:", error);
    throw error;
  }
}

/**
 * Gets a specific version of a note
 */
export async function getNoteVersion(historyId: string) {
  try {
    const version = await prisma.noteHistory.findUnique({
      where: { historyId },
      select: {
        historyId: true,
        versionNumber: true,
        contentSnapshot: true,
        updatedAt: true,
        noteId: true,
      },
    });

    if (!version) {
      return null;
    }

    return {
      ...version,
      contentSnapshot: JSON.parse(version.contentSnapshot),
    };
  } catch (error) {
    console.error("Error getting note version:", error);
    throw error;
  }
}

/**
 * Restores a note to a specific version
 */
export async function restoreNoteVersion(
  noteId: string,
  historyId: string,
  userId: string
): Promise<any> {
  try {
    const version = await getNoteVersion(historyId);

    if (!version || version.noteId !== noteId) {
      throw new Error("Version not found or does not belong to this note");
    }

    const { content, title } = version.contentSnapshot;

    // Update the note with the version's content
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        content,
        title,
      },
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
      },
    });

    // Create a new version entry for this restoration
    await createNoteVersion({
      noteId,
      userId,
      content,
      title,
    });

    return updatedNote;
  } catch (error) {
    console.error("Error restoring note version:", error);
    throw error;
  }
}

/**
 * Deletes old versions beyond a certain limit
 * Keeps only the most recent N versions
 */
export async function pruneOldVersions(
  noteId: string,
  keepCount: number = 10
): Promise<void> {
  try {
    const versions = await prisma.noteHistory.findMany({
      where: { noteId },
      orderBy: { versionNumber: "desc" },
      select: { historyId: true },
      skip: keepCount,
    });

    if (versions.length > 0) {
      await prisma.noteHistory.deleteMany({
        where: {
          historyId: {
            in: versions.map((v) => v.historyId),
          },
        },
      });
    }
  } catch (error) {
    console.error("Error pruning old versions:", error);
    throw error;
  }
}

/**
 * Compares two versions and returns differences
 */
export function compareVersions(version1: any, version2: any) {
  return {
    titleChanged: version1.title !== version2.title,
    contentChanged:
      JSON.stringify(version1.content) !== JSON.stringify(version2.content),
    timeDifference:
      new Date(version2.timestamp).getTime() -
      new Date(version1.timestamp).getTime(),
  };
}
