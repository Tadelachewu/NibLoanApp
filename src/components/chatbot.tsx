"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm the X Bank AI assistant. How can I help you today with your loan questions?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return;
    setIsLoading(true);

    const userMessage: Message = { id: Date.now(), text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
        const aiResponse: Message = { id: Date.now() + 1, text: "Thank you for your question. Based on our records, the interest rate for a standard personal loan is currently 5.75% APR. Would you like to know more about our loan products?", isUser: false };
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border">
        <div className="p-4 border-b">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <Bot className="text-primary"/> AI Chat Support
            </h3>
            <p className="text-sm text-muted-foreground">Get instant answers to your questions.</p>
        </div>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                {!message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-md rounded-lg p-3 text-sm shadow-md",
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.text}
                </div>
                {message.isUser && (
                  <Avatar className="h-8 w-8">
                      <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                     <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                     </Avatar>
                     <div className="max-w-xs rounded-lg p-3 text-sm bg-muted shadow-md flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                     </div>
                 </div>
             )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
            <div className="flex items-center gap-2">
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about loan terms, rates, etc."
                disabled={isLoading}
            />
            <Button onClick={handleSend} size="icon" aria-label="Send message" disabled={isLoading}>
                <Send className="h-4 w-4" />
            </Button>
            </div>
        </div>
    </div>
  );
}
