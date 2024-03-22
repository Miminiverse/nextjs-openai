import openai from "../../utils/openai";
import { Readable } from "stream";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  const assistantId = data.assistantId;
  const threadId = data.threadId;

  let customReadable;

  if (!threadId || !assistantId) {
    throw new Error("FileId or AssistantId is missing in the request body");
  }

  try {
    const run = openai.beta.threads.runs
      .createAndStream(threadId, {
        assistant_id: assistantId,
      })
      .on("textDelta", (textDelta, snapshot) => {
        const text = textDelta.value;
        console.log(text);
        const encoder = new TextEncoder();
        // Create a streaming response
        customReadable = new ReadableStream({
          start(controller) {
            const message = text;
            controller.enqueue(encoder.encode(`data: ${message}\n\n`));
          },
        });
      });

    return new Response(customReadable, {
      // Set the headers for Server-Sent Events (SSE)
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
        "Content-Encoding": "none",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.statusCode = 500;
    res.end();
  }
}
