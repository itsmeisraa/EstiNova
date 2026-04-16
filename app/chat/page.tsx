"use client";

import { useState, useCallback } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages, Message } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { cn } from "@/lib/utils";

// Demo responses for the AI
const demoResponses: Record<string, string> = {
  emploi: `## Votre emploi du temps pour demain

Voici vos cours prévus pour **mercredi 17 avril** :

### Matin
- **08h00 - 09h30** : Algorithmique Avancée (Amphi A)
- **09h45 - 11h15** : Travaux Pratiques - Base de données (Salle TP 3)
- **11h30 - 13h00** : Intelligence Artificielle (Salle 204)

### Après-midi
- **14h00 - 15h30** : Développement Web (Salle TP 1)
- **15h45 - 17h15** : Projet tuteuré - Réunion d'équipe (Salle 102)

N'oubliez pas d'apporter votre ordinateur portable pour les TP !`,

  notes: `## Vos notes du semestre en cours

Voici le récapitulatif de vos notes pour le **Semestre 6** :

| Module | Note | Coefficient | Mention |
|--------|------|-------------|---------|
| Algorithmique Avancée | 16.5/20 | 4 | Très Bien |
| Base de Données | 14.0/20 | 3 | Bien |
| Intelligence Artificielle | 17.0/20 | 4 | Très Bien |
| Développement Web | 15.5/20 | 3 | Bien |
| Réseaux | 13.0/20 | 2 | Assez Bien |

### Moyenne générale : **15.42/20**

Vous êtes actuellement classé **12ème** sur 120 étudiants de votre promotion.`,

  attestation: `## Demande d'attestation de scolarité

Pour obtenir une attestation de scolarité, vous avez deux options :

### Option 1 : En ligne (Recommandé)
1. Connectez-vous au portail étudiant
2. Allez dans **Documents > Attestations**
3. Cliquez sur "Générer une attestation"
4. Le document PDF sera disponible sous 24h

### Option 2 : Au secrétariat
- **Horaires** : Lundi à Jeudi, 9h-12h et 14h-16h
- **Bureau** : Scolarité, Bâtiment A, RDC
- **Délai** : 48 à 72 heures ouvrables

*Voulez-vous que je génère une demande en ligne pour vous ?*`,

  contact: `## Contact de votre responsable de filière

**Dr. Karim Mesbah**
*Responsable de la filière Informatique - 3ème année*

- **Email** : k.mesbah@estin.dz
- **Bureau** : Bâtiment B, 2ème étage, Bureau 215
- **Téléphone** : +213 (0) 34 XX XX XX

### Heures de permanence
- Mardi : 10h00 - 12h00
- Jeudi : 14h00 - 16h00

*Il est conseillé de prendre rendez-vous par email avant de vous déplacer.*`,

  default: `Je comprends votre question. En tant qu'assistant EstiNova, je peux vous aider avec :

- **Emplois du temps** : Consultez vos cours et planifications
- **Notes et résultats** : Accédez à vos évaluations
- **Documents administratifs** : Attestations, certificats, etc.
- **Annuaire** : Contacts des professeurs et services
- **Informations générales** : Calendrier académique, événements

Pourriez-vous préciser votre demande pour que je puisse mieux vous aider ?`,
};

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("emploi") || lowerMessage.includes("cours") || lowerMessage.includes("demain")) {
    return demoResponses.emploi;
  }
  if (lowerMessage.includes("note") || lowerMessage.includes("résultat") || lowerMessage.includes("moyenne")) {
    return demoResponses.notes;
  }
  if (lowerMessage.includes("attestation") || lowerMessage.includes("certificat") || lowerMessage.includes("document")) {
    return demoResponses.attestation;
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("professeur") || lowerMessage.includes("responsable") || lowerMessage.includes("email")) {
    return demoResponses.contact;
  }
  
  return demoResponses.default;
}

export default function ChatPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(content),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  }, []);

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <ChatSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ChatSidebar isCollapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
