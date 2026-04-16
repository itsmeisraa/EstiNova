"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 bg-card border border-border rounded-2xl p-2">
          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:text-foreground shrink-0"
            disabled={disabled}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question à EstiNova..."
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground",
              "focus:outline-none py-2.5 px-2 max-h-[200px]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />

          {/* Voice Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:text-foreground shrink-0"
            disabled={disabled}
          >
            <Mic className="w-5 h-5" />
          </Button>

          {/* Send/Stop Button */}
          <Button
            type={isLoading ? "button" : "submit"}
            size="icon"
            disabled={(!message.trim() && !isLoading) || disabled}
            className={cn(
              "h-10 w-10 shrink-0 transition-colors",
              isLoading
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            )}
          >
            {isLoading ? (
              <StopCircle className="w-5 h-5 text-white" />
            ) : (
              <Send className="w-5 h-5 text-primary-foreground" />
            )}
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-muted-foreground text-center mt-3">
          EstiNova peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </form>
    </div>
  );
}
