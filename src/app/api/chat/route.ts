// import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    // model: openai("gpt-4-turbo"),
    model: google("gemini-1.5-flash-latest"),
    // model: google("gemini-2.5-flash-preview-04-17"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
