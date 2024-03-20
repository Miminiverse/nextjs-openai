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
  } from '../../services/api';

export default function Assistant() {
    const [fileId, setFileId] = useState()
    
    const handleUpload =  async () => {
        let data = await uploadFile();
        setFileId(data.file.id)
         };

    const handleCreateAssistant = async () =>{
        let data = await createAssistant(fileId)
        console.log(data)
    }

    console.log(fileId)

  return (
    <>
    <button
    onClick={handleUpload}
    >
Upload
    </button>
    <button
    onClick={handleCreateAssistant}
    >
Assist
    </button>
    </>
  );
}
