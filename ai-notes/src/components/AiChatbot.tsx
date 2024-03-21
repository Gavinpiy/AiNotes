import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { XCircle } from "lucide-react";
import { Input } from "./ui/input";

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
      <div className="flex h-[600px] flex-col rounded border shadow-xl bg-white">
        <div className="h-full">Messages</div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input value={input} onChange={handleInputChange} placeholder="Say Something..."></Input>
        </form>
      </div>
    </div>
  );
}
