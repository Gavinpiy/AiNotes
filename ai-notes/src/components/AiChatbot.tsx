import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Bot, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useRef } from "react";

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

  //useRef to get the input and scroll
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
}), [messages];
  

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
      <div className="flex h-[600px] flex-col rounded border bg-white shadow-xl ">
        <div className="h-full mt-3 px-3 overflow-y-auto  " ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id}></ChatMessage>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            ref={inputRef}
          ></Input>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
  const { user } = useUser();
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p className={cn("whitespace-pre-line rounded-md border px-3 py-2", isAiMessage ? 'bg-background' : 'bg-primary text-primary-foreground' )}>
        {content}
      </p>
      {!isAiMessage && user?.imageUrl &&(
        <Image
        src={user.imageUrl}
        alt='user image'
        width={100}
        height={100}
        className="rounded-full ml-2 w-10 h-10 object-cover"
        ></Image>
      )}
    </div>
  );
}
