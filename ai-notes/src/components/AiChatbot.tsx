import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Bot, Trash, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

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
  }),
    [messages];

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  //boolean will only be true if the last message is from the user
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    // cn function allows us to combine tailwind classes conditionally
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-2 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <button onClick={onClose} className="flex mb-1 ms-auto font-bold">
        {"Close "}
        <XCircle size={23} />{""}
      </button>
      <div className="flex h-[600px] flex-col rounded border bg-white shadow-xl ">
        <div className="mt-3 h-full overflow-y-auto px-3  " ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id}></ChatMessage>
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{ role: "assistant", content: "Thinking..." }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex items-center justify-center h-full gap-3">
              <Bot/>
              Ask me anything!
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            type="button"
            className="shrink-0"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            ref={inputRef}
          ></Input>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message: { role, content } }: { message: Pick<Message, 'role' | 'content'>}) {
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
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </p>
      {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="user image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        ></Image>
      )}
    </div>
  );
}
