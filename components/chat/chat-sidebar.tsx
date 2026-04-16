"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Plus,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const demoConversations: Conversation[] = [
  {
    id: "1",
    title: "Mon emploi du temps",
    date: "Aujourd'hui",
    preview: "Quels sont mes cours demain ?",
  },
  {
    id: "2",
    title: "Notes du semestre",
    date: "Hier",
    preview: "Affiche mes notes en algorithmique",
  },
  {
    id: "3",
    title: "Attestation de scolarité",
    date: "Il y a 3 jours",
    preview: "Comment obtenir une attestation ?",
  },
  {
    id: "4",
    title: "Annuaire professeurs",
    date: "La semaine dernière",
    preview: "Contact de M. Benali",
  },
];

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function ChatSidebar({ isCollapsed, onToggle }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations] = useState<Conversation[]>(demoConversations);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">EstiNova</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          className={cn(
            "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
            isCollapsed && "px-0"
          )}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Nouvelle conversation</span>}
        </Button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-2">
        {!isCollapsed && (
          <div className="space-y-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className="group flex items-center gap-2 p-3 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {conv.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{conv.preview}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 text-muted-foreground hover:text-sidebar-foreground"
                    >
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
        {isCollapsed && (
          <div className="space-y-2 flex flex-col items-center">
            {filteredConversations.slice(0, 5).map((conv) => (
              <Button
                key={conv.id}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                title={conv.title}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Paramètres</span>}
        </Button>
      </div>
    </aside>
  );
}
