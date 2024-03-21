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

export default function Assistant() {
  const [fileId, setFileId] = useState();
  const [threadId, setThreadId] = useState();
  const [assistantId, setAssistantId] = useState();
  const [runId, setRunId] = useState();

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
    let data = await createRun(threadId, assistantId);
    console.log(data);
    setRunId(data.run.id);
  };

  const handleListMessages = async () => {
    let data = await listMessages(threadId);
    console.log(data);
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
