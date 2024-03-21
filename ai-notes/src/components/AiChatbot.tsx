import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Message } from "ai";

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
      <button onClick={onClose} className="mb-1 ms-auto block">
        {" "}
        <XCircle size={30} />{" "}
      </button>
      <div className="flex h-[600px] flex-col rounded border bg-white shadow-xl">
        <div className="h-full">
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id}></ChatMessage>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          ></Input>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
  return (
    <div className="mb-3">
      <div>{role}</div>
      <div>{content}</div>
    </div>
  );
}
