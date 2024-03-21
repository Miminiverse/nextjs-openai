import { NextResponse } from "next/server";
import openai from "../../utils/openai";

export async function POST(req) {
  const { threadId } = await req.json();
  console.log(threadId);
  if (!threadId) {
    throw new Error("Thread is missing in the request body");
  }
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    console.log(messages);

    return NextResponse.json({
      messages: messages,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
