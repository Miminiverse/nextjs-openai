import openai from "../../utils/openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const threadId = data.threadId;
  const runId = data.runId;

  if (!threadId || !runId) {
    throw new Error("FileId or runId is missing in the request body");
  }
  try {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

    return NextResponse.json({
      runStatus: runStatus.status,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
