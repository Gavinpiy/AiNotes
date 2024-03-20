import { cn } from "@/lib/utils";
import { useChat } from "ai/react";

interface AiChatbotProps {
  open: boolean;
  onClose: () => void;
}

export default function AiChatbot({ open, onClose }: AiChatbotProps) {
  //use vercel ai SDK
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();
  return (
    // cn function allows us to combine tailwind classes conditionally
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-2 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <h1>AI Chatbot</h1>
    </div>
  );
}
