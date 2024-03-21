import openai from "../../utils/openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const assistantId = data.assistantId;
  const threadId = data.threadId;
  console.log({ data: data });
  if (!threadId || !assistantId) {
    throw new Error("FileId or AssistantId is missing in the request body");
  }
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    return NextResponse.json({
      run: run,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
