import { startWebSocketServer } from "@/lib/websocket-server";

const PORT = Number(process.env.WS_PORT) || 3001;
startWebSocketServer(PORT);
