import { NextRequest } from "next/server";
import OpenAI from "openai";
import { ChatMessage, APIConfig } from "@/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, config }: { messages: ChatMessage[]; config: APIConfig } = body;

    if (!config.apiKey) {
      return new Response(JSON.stringify({ error: "API Key is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openai = new OpenAI({ apiKey: config.apiKey });

    const stream = await openai.chat.completions.create({
      model: config.model,
      messages,
      temperature: config.temperature,
      max_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              // SSE format: "data: <text>\n\n"
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(text)}\n\n`));
            }
          }
          // Signal end of stream
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
