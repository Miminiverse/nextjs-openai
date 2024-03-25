import openai from "../../utils/openai";
import { Readable } from "stream";

export async function POST(req, res) {
  const data = await req.json();
  const assistantId = data.assistantId;
  const threadId = data.threadId;

  if (!threadId || !assistantId) {
    throw new Error("FileId or AssistantId is missing in the request body");
  }

  try {
    const encoder = new TextEncoder();

    // Create a custom ReadableStream
    const customReadable = new ReadableStream({
      start(controller) {
        // Create and stream data using openai.beta.threads.runs
        openai.beta.threads.runs
          .createAndStream(threadId, {
            assistant_id: assistantId,
          })
          .on("textDelta", (textDelta, snapshot) => {
            const text = textDelta.value;
            controller.enqueue(encoder.encode(`data: ${text}\n\n`));
          });
      },
    });

    // Return the custom ReadableStream as the response
    return new Response(customReadable, {
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
