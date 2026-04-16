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
  Users, 
  FileText, 
  BookOpen,
  ClipboardList,
  BarChart3,
  Bell,
  User,
  MessageSquare,
  Sparkles,
  ChevronRight,
  GraduationCap,
  CheckSquare
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  { icon: Calendar, label: 'Mon emploi du temps', query: 'Montre-moi mon emploi du temps de cette semaine' },
  { icon: Users, label: 'Mes etudiants', query: 'Liste des etudiants de mes cours' },
  { icon: ClipboardList, label: 'Saisir les notes', query: 'Comment saisir les notes des examens?' },
  { icon: FileText, label: 'Mes documents', query: 'Mes documents de cours' },
]

const stats = [
  { label: 'Etudiants', value: '156', icon: GraduationCap, color: 'text-primary' },
  { label: 'Cours', value: '4', icon: BookOpen, color: 'text-accent' },
  { label: 'A corriger', value: '32', icon: CheckSquare, color: 'text-chart-4' },
]

const upcomingClasses = [
  { course: 'Algorithmique Avancee', time: '08:30 - 10:00', room: 'Amphi A', students: 45 },
  { course: 'TP Bases de Donnees', time: '10:15 - 11:45', room: 'Salle Info 3', students: 24 },
  { course: 'Intelligence Artificielle', time: '14:00 - 15:30', room: 'Amphi B', students: 87 },
]

export default function TeacherDashboard() {
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

    setTimeout(() => {
      const responses: Record<string, string> = {
        'emploi': `Voici votre emploi du temps pour cette semaine :

**Lundi**
- 08:30 - 10:00 : Algorithmique Avancee (Amphi A) - 45 etudiants
- 10:15 - 11:45 : TP Bases de Donnees (Salle Info 3) - 24 etudiants
- 14:00 - 15:30 : Intelligence Artificielle (Amphi B) - 87 etudiants

**Mercredi**
- 08:30 - 10:00 : Algorithmique Avancee (Amphi A) - 45 etudiants
- 14:00 - 17:00 : Consultation PFE (Bureau 302)

**Vendredi**
- 10:15 - 11:45 : TP Bases de Donnees (Salle Info 3) - 24 etudiants

Souhaitez-vous modifier un créneau?`,
        'etudiants': `Voici la liste de vos etudiants par cours :

**Algorithmique Avancee (45 etudiants)**
- Groupe A : 23 etudiants
- Groupe B : 22 etudiants

**TP Bases de Donnees (24 etudiants)**
- Section unique

**Intelligence Artificielle (87 etudiants)**
- 3eme annee : 45 etudiants
- Master 1 : 42 etudiants

Voulez-vous voir les details d'un groupe specifique?`,
        'notes': `Pour saisir les notes des examens :

1. Accedez a "Gestion des Notes" dans le portail enseignant
2. Selectionnez le module et la session d'examen
3. Importez un fichier Excel ou saisissez manuellement
4. Validez et soumettez pour approbation

**Notes en attente de saisie :**
- Algorithmique - Examen Partiel (32 copies)
- TP Bases de Donnees - TP Note (24 copies)

Date limite : 15 Janvier 2025`,
        'documents': `Vos documents de cours :

**Algorithmique Avancee**
- Cours_Algo_Chap1.pdf (12 pages)
- Cours_Algo_Chap2.pdf (18 pages)
- TD_Serie1.pdf

**Intelligence Artificielle**
- Introduction_IA.pdf
- Machine_Learning.pdf
- TP_Keras.pdf

Souhaitez-vous partager un nouveau document avec vos etudiants?`,
      }

      let response = "Je suis votre assistant EstiNova. Je peux vous aider a gerer vos cours, vos etudiants, saisir les notes et organiser vos documents. Comment puis-je vous aider?"

      const lowerContent = content.toLowerCase()
      if (lowerContent.includes('emploi') || lowerContent.includes('semaine')) {
        response = responses['emploi']
      } else if (lowerContent.includes('etudiant') || lowerContent.includes('liste')) {
        response = responses['etudiants']
      } else if (lowerContent.includes('note') || lowerContent.includes('saisir')) {
        response = responses['notes']
      } else if (lowerContent.includes('document') || lowerContent.includes('cours')) {
        response = responses['documents']
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="font-semibold text-sidebar-foreground">EstiNova</h1>
                <p className="text-xs text-muted-foreground">Espace Enseignant</p>
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <User className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium text-sidebar-foreground">
                  {user?.name || 'Enseignant'}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-b border-sidebar-border p-4">
            <h3 className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              Statistiques
            </h3>
            <div className="space-y-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming classes */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              Prochains Cours
            </h3>
            <div className="space-y-2">
              {upcomingClasses.map((cls, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-border/50 bg-secondary/30 p-3"
                >
                  <p className="text-sm font-medium text-foreground">{cls.course}</p>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{cls.time}</span>
                    <span>{cls.room}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-accent">
                    <Users className="h-3 w-3" />
                    <span>{cls.students} etudiants</span>
                  </div>
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
              <Bot className="h-5 w-5 text-accent" />
              <span className="font-medium text-foreground">Assistant IA - Enseignant</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <BarChart3 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                5
              </span>
            </Button>
          </div>
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
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20">
                  <Sparkles className="h-10 w-10 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Bonjour, Professeur {user?.name?.split('.')[0] || ''}!
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                  Comment puis-je vous assister aujourd&apos;hui?
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
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-accent/50 hover:bg-secondary/50"
                  >
                    <action.icon className="h-5 w-5 text-accent" />
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
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-card border border-border'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="mb-2 flex items-center gap-2">
                            <Bot className="h-4 w-4 text-accent" />
                            <span className="text-xs font-medium text-accent">EstiNova</span>
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
                      <Bot className="h-4 w-4 text-accent" />
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '300ms' }} />
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
                  className="h-12 w-full rounded-xl border border-border bg-input pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90"
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
