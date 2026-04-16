'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  Bot, 
  Send, 
  Menu, 
  X, 
  LogOut, 
  Calendar, 
  BookOpen, 
  FileText, 
  GraduationCap,
  Clock,
  Award,
  Bell,
  User,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  { icon: Calendar, label: 'Mon emploi du temps', query: 'Montre-moi mon emploi du temps de cette semaine' },
  { icon: BookOpen, label: 'Mes notes', query: 'Quelles sont mes notes du dernier semestre?' },
  { icon: FileText, label: 'Attestations', query: 'Comment obtenir une attestation de scolarite?' },
  { icon: Clock, label: 'Absences', query: 'Combien d\'absences ai-je ce semestre?' },
]

const recentActivities = [
  { type: 'grade', title: 'Nouvelle note en Algorithmique', time: 'Il y a 2h', value: '16/20' },
  { type: 'schedule', title: 'Cours annule demain', time: 'Il y a 5h', value: 'IA - 10h' },
  { type: 'notification', title: 'Inscription aux examens ouverte', time: 'Hier', value: '' },
]

export default function StudentDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({
          email: user.email || '',
          name: user.user_metadata?.full_name || user.email?.split('@')[0],
        })
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'emploi': `Voici votre emploi du temps pour cette semaine :

**Lundi**
- 08:30 - 10:00 : Algorithmique Avancee (Amphi A)
- 10:15 - 11:45 : TP Bases de Donnees (Salle Info 3)
- 14:00 - 15:30 : Intelligence Artificielle (Amphi B)

**Mardi**
- 08:30 - 10:00 : Mathematiques (Salle 201)
- 10:15 - 11:45 : Reseaux (Amphi C)

**Mercredi**
- 14:00 - 17:00 : Projet de Fin d'Etudes (Libre)

Souhaitez-vous plus de details sur un cours specifique?`,
        'notes': `Voici vos notes du dernier semestre :

| Module | Note | Coefficient |
|--------|------|-------------|
| Algorithmique | 16/20 | 4 |
| Bases de Donnees | 14/20 | 3 |
| Intelligence Artificielle | 17/20 | 4 |
| Reseaux | 13/20 | 3 |
| Mathematiques | 15/20 | 2 |

**Moyenne Generale : 15.19/20**

Felicitations pour ces excellents resultats!`,
        'attestation': `Pour obtenir une attestation de scolarite :

1. Rendez-vous sur le portail etudiant
2. Section "Documents administratifs"
3. Cliquez sur "Demander une attestation"
4. Le document sera disponible sous 24-48h

Vous pouvez aussi vous rendre directement au service de scolarite.`,
        'absences': `Votre situation d'absences ce semestre :

- **Absences justifiees** : 2
- **Absences non justifiees** : 1
- **Retards** : 0

Vous etes dans les limites autorisees. Continuez ainsi!`,
      }

      let response = "Je suis votre assistant EstiNova. Je peux vous aider avec votre emploi du temps, vos notes, vos documents administratifs et bien plus. Comment puis-je vous aider?"

      const lowerContent = content.toLowerCase()
      if (lowerContent.includes('emploi') || lowerContent.includes('semaine')) {
        response = responses['emploi']
      } else if (lowerContent.includes('note') || lowerContent.includes('resultat')) {
        response = responses['notes']
      } else if (lowerContent.includes('attestation') || lowerContent.includes('document')) {
        response = responses['attestation']
      } else if (lowerContent.includes('absence')) {
        response = responses['absences']
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 z-50 h-full w-[280px] border-r border-border bg-sidebar lg:relative lg:translate-x-0"
        style={{ x: 0 }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-sidebar-foreground">EstiNova</h1>
                <p className="text-xs text-muted-foreground">Espace Etudiant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User info */}
          <div className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium text-sidebar-foreground">
                  {user?.name || 'Etudiant'}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="border-b border-sidebar-border p-4">
            <h3 className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              Apercu Rapide
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-secondary/50 p-3">
                <Award className="mb-1 h-4 w-4 text-primary" />
                <p className="text-lg font-semibold text-foreground">15.19</p>
                <p className="text-xs text-muted-foreground">Moyenne</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <Clock className="mb-1 h-4 w-4 text-accent" />
                <p className="text-lg font-semibold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Absences</p>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              Activite Recente
            </h3>
            <div className="space-y-2">
              {recentActivities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-border/50 bg-secondary/30 p-3"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    {activity.value && (
                      <span className="text-xs font-medium text-primary">{activity.value}</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Deconnexion
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-0">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-xl lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Assistant IA</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
        </header>

        {/* Chat area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 flex flex-col items-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Bonjour, {user?.name?.split(' ')[0] || 'Etudiant'}!
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                  Comment puis-je vous aider aujourd&apos;hui?
                </p>
              </motion.div>

              {/* Quick actions */}
              <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(action.query)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-secondary/50"
                  >
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm font-medium text-foreground">{action.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <div className="mx-auto max-w-3xl space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border border-border'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="mb-2 flex items-center gap-2">
                            <Bot className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium text-primary">EstiNova</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
                      <Bot className="h-4 w-4 text-primary" />
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="border-t border-border bg-card/50 p-4 backdrop-blur-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage(input)
              }}
              className="mx-auto flex max-w-3xl gap-3"
            >
              <div className="relative flex-1">
                <MessageSquare className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="h-12 w-full rounded-xl border border-border bg-input pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
