import openai from "../../utils/openai";
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function POST(req) {
    const { fileId } = await req.json();
    console.log(fileId)
    if (!fileId) {
        throw new Error("File is missing in the request body");
      }
    try {
      
      const assistant = await openai.beta.assistants.create({
        instructions: "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.",
        name: "Mimimimi",
        model: "gpt-4-turbo-preview",
        tools: [{"type": "retrieval"}],
        file_ids: [fileId]
      });
  
      console.log(assistant)
  
      return await NextResponse.json({
        assistant: assistant,
      });
    } catch (error) {
      return await NextResponse.json(
        error 
      );
    }
  }
  