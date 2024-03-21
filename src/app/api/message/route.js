import { NextResponse } from "next/server";
import openai from "../../utils/openai";

export async function POST(req) {
  const { threadId } = await req.json();
  console.log(threadId);
  if (!threadId) {
    throw new Error("Thread is missing in the request body");
  }
  try {
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: "Summarize this book",
    });
    console.log(message);

    return NextResponse.json({
      message: message,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
