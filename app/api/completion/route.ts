import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { prompt, context } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: `You are a helpful AI writing assistant embedded in a note-taking app.
    Your goal is to help the user complete their sentences or paragraphs based on the context provided.
    Keep your suggestions concise, relevant, and in the same tone as the user's writing.
    Do not repeat the user's input. Just provide the continuation.`,
    prompt: `Context: ${context}\n\nUser wrote: ${prompt}\n\nContinue writing:`,
  });

  return result.toDataStreamResponse();
}
