import openai from "../../utils/openai";
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function POST(req) {
    try {
        const filePath = join(process.cwd(), 'public', 'book.pdf');
      const file = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "assistants",
      });

      return await NextResponse.json({
        file: file,
      });
    } catch (error) {
      return await NextResponse.json(
        error 
      );
    }
  }
  