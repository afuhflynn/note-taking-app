import { Server } from "socket.io";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const startWebSocketServer = (port = 3001) => {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: { origin: "*" }, // adjust for production
  });

  const noteRooms = new Map<string, Set<string>>();

  io.on("connection", (socket) => {
    console.log(`🟢 Socket ${socket.id} connected`);

    socket.on("join-note", async ({ noteId, userId, userName }) => {
      socket.join(noteId);
      if (!noteRooms.has(noteId)) noteRooms.set(noteId, new Set());
      noteRooms.get(noteId)!.add(socket.id);

      // Broadcast presence info (collaborators)
      const collaborators = await prisma.noteCollaborator.findMany({
        where: { sharedNoteId: noteId },
        select: { userId: true, userName: true, lastActiveAt: true },
      });
      io.to(noteId).emit("presence", collaborators);
    });

    socket.on("yjs-update", ({ noteId, update }) => {
      socket.to(noteId).emit("yjs-update", { update });
    });

    socket.on("disconnect", () => {
      console.log(`🔴 Socket ${socket.id} disconnected`);
      noteRooms.forEach((sockets, noteId) => {
        sockets.delete(socket.id);
        if (sockets.size === 0) noteRooms.delete(noteId);
      });
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 WebSocket server listening on ws://localhost:${port}`);
  });
};
