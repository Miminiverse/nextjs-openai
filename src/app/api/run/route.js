import openai from "../../utils/openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const assistantId = data.assistantId;
  const threadId = data.threadId;
  let textDeltaValue; // Variable to store textDelta value

  if (!threadId || !assistantId) {
    throw new Error("FileId or AssistantId is missing in the request body");
  }
  try {
    const run = openai.beta.threads.runs
      .createAndStream(threadId, {
        assistant_id: assistantId,
      })
      .on("textCreated", (text) => {
        // console.log("Received text from assistant:", text); // Log the received text
        process.stdout.write("\nassistant > ");
      })
      .on("textDelta", (textDelta, snapshot) => {
        console.log("Received textDelta from assistant:", textDelta.value);
        textDeltaValue = textDelta.value; // Store textDelta value
        process.stdout.write(textDelta.value);
      })
      .on("toolCallCreated", (toolCall) =>
        process.stdout.write(`\nassistant > ${toolCall.type}\n\n`),
      );

    // Return a promise that resolves when textDelta value is available
    const textDeltaPromise = new Promise((resolve) => {
      run.on("textDelta", () => {
        resolve(textDeltaValue);
      });
    });

    // Wait for the promise to resolve before returning the response
    const resolvedTextDeltaValue = await textDeltaPromise;

    return NextResponse.json({
      run: run,
      text: resolvedTextDeltaValue, // Return the resolved textDelta value
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
