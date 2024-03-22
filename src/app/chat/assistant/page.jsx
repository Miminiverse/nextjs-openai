"use client";
import { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import {
  uploadFile,
  createAssistant,
  createThread,
  createMessage,
  createRun,
  listMessages,
} from "../../services/api";
import { fetchAssistantResponse } from "../../services/chat";

export default function Assistant() {
  const [fileId, setFileId] = useState();
  const [threadId, setThreadId] = useState();
  const [assistantId, setAssistantId] = useState();
  const [runId, setRunId] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [messages, setMessages] = useState();

  const handleUpload = async () => {
    let data = await uploadFile();
    setFileId(data.file.id);
  };

  const handleCreateAssistant = async () => {
    let data = await createAssistant(fileId);
    setAssistantId(data.assistant.id);
  };

  const handleCreateThread = async () => {
    let data = await createThread();
    setThreadId(data.thread.id);
  };

  const handleCreateMessage = async () => {
    let data = await createMessage(threadId);
    console.log(data);
  };

  const handleRun = async () => {
    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, assistantId }),
      });

      if (!response.ok) {
        console.error("Failed");
      }

      const responseData = await response.json();
      console.log("Run successfully:", responseData);

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        console.log(chunkValue);
        // setMessages((prev) => prev + chunkValue);
      }
      setRunId(data.run.id);
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the caller function if needed
    }
  };

  console.log({ runId: runId });
  console.log({ threadId: threadId });
  // console.log({ messages: messages });

  const handleListMessages = async () => {
    if (runId && threadId) {
      setStatusMessage("checking status");
      const response = fetchAssistantResponse(
        threadId,
        runId,
        setStatusMessage,
      );
      console.log(response);
    }
  };

  return (
    <>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleCreateAssistant}>Assist</button>
      <button onClick={handleCreateThread}>Create thread</button>
      <button onClick={handleCreateMessage}>Create message</button>
      <button onClick={handleRun}>Run</button>
      <button onClick={handleListMessages}>List messages</button>
    </>
  );
}
