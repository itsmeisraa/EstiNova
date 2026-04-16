"use client";

import { useRef, useEffect } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for the AI response
  const lines = content.split("\n");
  
  return (
    <div className="ai-content space-y-2">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="text-[1.05rem] font-semibold text-[#a5b4fc] mt-3 mb-1">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-[1.2rem] font-bold text-primary mt-4 mb-2 border-b border-border pb-1">
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-[1.4rem] font-bold text-foreground mt-4 mb-2">
              {line.replace("# ", "")}
            </h1>
          );
        }
        // Bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={index} className="ml-4 text-secondary-foreground leading-relaxed list-disc">
              {line.replace(/^[-*] /, "")}
            </li>
          );
        }
        // Bold text handling
        if (line.includes("**")) {
          const parts = line.split(/(\*\*[^*]+\*\*)/);
          return (
            <p key={index} className="text-secondary-foreground leading-relaxed">
              {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={i} className="font-bold text-foreground">
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        }
        // Code blocks
        if (line.startsWith("`") && line.endsWith("`")) {
          return (
            <code
              key={index}
              className="bg-secondary text-[#a78bfa] font-mono text-sm px-1.5 py-0.5 rounded"
            >
              {line.replace(/`/g, "")}
            </code>
          );
        }
        // Empty lines
        if (line.trim() === "") {
          return <div key={index} className="h-2" />;
        }
        // Regular paragraphs
        return (
          <p key={index} className="text-secondary-foreground leading-relaxed">
            {line}
          </p>
        );
      })}
    </div>
  );
}

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-6 w-6 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </Button>
  );
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Bienvenue sur EstiNova
        </h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Je suis votre assistant intelligent pour l&apos;ESTIN. Posez-moi vos questions
          sur les emplois du temps, les notes, les documents administratifs et plus encore.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
          {[
            "Quel est mon emploi du temps demain ?",
            "Affiche mes notes du semestre",
            "Comment obtenir une attestation ?",
            "Contact de mon responsable de filière",
          ].map((suggestion, index) => (
            <button
              key={index}
              className="p-4 text-left text-sm bg-card hover:bg-secondary border border-border rounded-xl transition-colors text-secondary-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "group flex gap-4 max-w-4xl mx-auto",
            message.role === "user" ? "flex-row-reverse" : ""
          )}
        >
          {/* Avatar */}
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              message.role === "assistant"
                ? "bg-gradient-to-br from-primary to-accent"
                : "bg-secondary"
            )}
          >
            {message.role === "assistant" ? (
              <Bot className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-foreground" />
            )}
          </div>

          {/* Message Content */}
          <div
            className={cn(
              "flex-1 space-y-2",
              message.role === "user" ? "text-right" : ""
            )}
          >
            <div
              className={cn(
                "inline-block p-4 rounded-2xl",
                message.role === "assistant"
                  ? "bg-card border border-border text-left w-full"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {message.role === "assistant" ? (
                <MessageContent content={message.content} />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
            {message.role === "assistant" && (
              <div className="flex items-center gap-2">
                <CopyButton content={message.content} />
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 max-w-4xl mx-auto">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
