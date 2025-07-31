"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { chat } from "@/ai/flows/chat";
import { useToast } from "@/hooks/use-toast";


interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export function Chatbot() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
        { id: 'initial-greeting', text: t('chatbot.greeting'), isUser: false },
    ])
  }, [t]);

  useEffect(() => {
    if(scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages])

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    const userMessage: Message = { id: crypto.randomUUID(), text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
        const aiResponseText = await chat(input);
        const aiResponse: Message = { id: crypto.randomUUID(), text: aiResponseText, isUser: false };
        setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get a response from the AI assistant. Please try again.",
        });
        // Remove the user message if the API call fails
        setMessages((prev) => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
        setIsLoading(false);
    }
  };

  const commonQuestions = [
    t('chatbot.question1'),
    t('chatbot.question2'),
    t('chatbot.question3')
  ]

  const handleQuestionClick = (question: string) => {
    setInput(question);
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border">
        <div className="p-4 border-b">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <Bot className="text-primary"/> {t('chatbot.title')}
            </h3>
            <p className="text-sm text-muted-foreground">{t('chatbot.description')}</p>
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
                    "max-w-md rounded-lg p-3 text-sm shadow-md whitespace-pre-wrap",
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
        <div className="border-t p-4 space-y-3">
             <div className="flex flex-wrap gap-2">
                {commonQuestions.map((q, i) => (
                    <Button key={i} variant="outline" size="sm" onClick={() => handleQuestionClick(q)} className="text-xs h-auto py-1.5">
                        {q}
                    </Button>
                ))}
            </div>
            <form onSubmit={handleSend} className="flex items-center gap-2">
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatbot.inputPlaceholder')}
                disabled={isLoading}
            />
            <Button type="submit" size="icon" aria-label={t('chatbot.sendAriaLabel')} disabled={isLoading || input.trim() === ""}>
                <Send className="h-4 w-4" />
            </Button>
            </form>
        </div>
    </div>
  );
}
