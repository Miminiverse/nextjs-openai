import { NextResponse } from "next/server";
import openai from "../../utils/openai";
import fs from "fs";

export async function POST(req) {
  try {
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: "What is this book about?",
        },
      ],
    });
    console.log(thread);

    return NextResponse.json({
      thread: thread,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
