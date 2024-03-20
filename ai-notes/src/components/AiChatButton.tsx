import React, { useState } from "react";
import AiChatbot from "./AiChatbot";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export default function AiChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Bot size={20} className="mr-2" />
        AI Chat
      </Button>
      <AiChatbot open={open} onClose={() => setOpen(false)}></AiChatbot>
    </>
  );
}
