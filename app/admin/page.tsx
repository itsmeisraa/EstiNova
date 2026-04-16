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
  Users, 
  FileText, 
  Settings,
  Shield,
  BarChart3,
  Bell,
  User,
  MessageSquare,
  Sparkles,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  { icon: Users, label: 'Gestion Utilisateurs', query: 'Statistiques des utilisateurs du systeme' },
  { icon: BarChart3, label: 'Rapports', query: 'Generer un rapport d\'activite' },
  { icon: Database, label: 'Base de donnees', query: 'Etat de la base de donnees' },
  { icon: Settings, label: 'Configuration', query: 'Parametres du systeme' },
]

const systemStats = [
  { label: 'Etudiants', value: '2,847', icon: GraduationCap, color: 'text-primary', change: '+12%' },
  { label: 'Enseignants', value: '156', icon: BookOpen, color: 'text-accent', change: '+3%' },
  { label: 'Requetes/jour', value: '8,432', icon: Activity, color: 'text-chart-4', change: '+28%' },
  { label: 'Uptime', value: '99.9%', icon: CheckCircle, color: 'text-green-500', change: '' },
]

const recentAlerts = [
  { type: 'warning', message: 'Pic de charge detecte - 14:30', time: 'Il y a 2h' },
  { type: 'success', message: 'Sauvegarde automatique terminee', time: 'Il y a 4h' },
  { type: 'info', message: '32 nouveaux utilisateurs inscrits', time: 'Aujourd\'hui' },
]

export default function AdminDashboard() {
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
        'utilisateurs': `**Statistiques des Utilisateurs - EstiNova**

| Type | Total | Actifs (30j) | Nouveaux (7j) |
|------|-------|--------------|---------------|
| Etudiants | 2,847 | 2,156 | 32 |
| Enseignants | 156 | 142 | 3 |
| Administrateurs | 12 | 12 | 0 |

**Repartition par Annee (Etudiants)**
- 1ere annee : 892
- 2eme annee : 756
- 3eme annee : 634
- Master 1 : 321
- Master 2 : 244

Voulez-vous exporter ces donnees ou voir plus de details?`,
        'rapport': `**Rapport d'Activite - Janvier 2025**

**Utilisation du Systeme**
- Requetes totales : 253,460
- Moyenne journaliere : 8,432 requetes
- Temps de reponse moyen : 1.2s
- Taux de satisfaction : 94%

**Top 5 des Requetes**
1. Consultation emploi du temps (32%)
2. Verification des notes (28%)
3. Demande d'attestations (15%)
4. Recherche contacts (12%)
5. Informations cours (13%)

**Recommandations**
- Augmenter la capacite serveur pour les periodes d'examens
- Optimiser le cache pour les emplois du temps

Souhaitez-vous un rapport plus detaille?`,
        'base': `**Etat de la Base de Donnees**

**Sante Globale : Excellente**

| Metrique | Valeur | Statut |
|----------|--------|--------|
| Connexions actives | 45/100 | OK |
| Espace utilise | 12.4 GB / 50 GB | OK |
| Temps reponse | 8ms | Excellent |
| Derniere sauvegarde | Il y a 4h | OK |

**Tables Principales**
- users : 3,015 enregistrements
- courses : 487 enregistrements  
- schedules : 12,456 enregistrements
- grades : 89,234 enregistrements
- documents : 2,341 enregistrements

Toutes les sauvegardes automatiques fonctionnent correctement.`,
        'config': `**Configuration Systeme - EstiNova**

**Parametres Generaux**
- Version : 2.4.1
- Environnement : Production
- Mode maintenance : Desactive
- Derniere mise a jour : 10 Janvier 2025

**Modules Actifs**
- Gestion Emploi du Temps
- Systeme de Notes
- Gestion Documents
- Annuaire
- Communication
- Tutorat IA

**Integrations**
- Google OAuth : Active
- n8n Workflows : 12 actifs
- RAG Pipeline : Operationnel
- Notifications Email : Active

Souhaitez-vous modifier une configuration?`,
      }

      let response = "Je suis votre assistant administrateur EstiNova. Je peux vous aider a gerer le systeme, les utilisateurs, generer des rapports et configurer la plateforme. Comment puis-je vous aider?"

      const lowerContent = content.toLowerCase()
      if (lowerContent.includes('utilisateur') || lowerContent.includes('statistique')) {
        response = responses['utilisateurs']
      } else if (lowerContent.includes('rapport') || lowerContent.includes('activite')) {
        response = responses['rapport']
      } else if (lowerContent.includes('base') || lowerContent.includes('donnee')) {
        response = responses['base']
      } else if (lowerContent.includes('config') || lowerContent.includes('parametre')) {
        response = responses['config']
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
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 z-50 h-full w-[300px] border-r border-border bg-sidebar lg:relative lg:translate-x-0"
        style={{ x: 0 }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/20">
                <Shield className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <h1 className="font-semibold text-sidebar-foreground">EstiNova</h1>
                <p className="text-xs text-muted-foreground">Administration</p>
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/20">
                <User className="h-5 w-5 text-chart-4" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium text-sidebar-foreground">
                  {user?.name || 'Administrateur'}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* System Stats */}
          <div className="border-b border-sidebar-border p-4">
            <h3 className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              Etat du Systeme
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {systemStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg bg-secondary/50 p-3"
                >
                  <div className="flex items-center justify-between">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    {stat.change && (
                      <span className="text-[10px] text-green-500">{stat.change}</span>
                    )}
                  </div>
                  <p className="mt-1 text-lg font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              Alertes Recentes
            </h3>
            <div className="space-y-2">
              {recentAlerts.map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-border/50 bg-secondary/30 p-3"
                >
                  <div className="flex items-start gap-2">
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
                    ) : alert.type === 'success' ? (
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                    ) : (
                      <Activity className="mt-0.5 h-4 w-4 text-primary" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{alert.time}</p>
                    </div>
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
              <Bot className="h-5 w-5 text-chart-4" />
              <span className="font-medium text-foreground">Console Administration</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-chart-4 text-[10px] text-foreground">
                3
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
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-chart-4/20">
                  <Sparkles className="h-10 w-10 text-chart-4" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Console Administration
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                  Gerez le systeme EstiNova avec l&apos;assistance de l&apos;IA
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
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-chart-4/50 hover:bg-secondary/50"
                  >
                    <action.icon className="h-5 w-5 text-chart-4" />
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
                            ? 'bg-chart-4 text-foreground'
                            : 'bg-card border border-border'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="mb-2 flex items-center gap-2">
                            <Bot className="h-4 w-4 text-chart-4" />
                            <span className="text-xs font-medium text-chart-4">EstiNova Admin</span>
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
                      <Bot className="h-4 w-4 text-chart-4" />
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-chart-4" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-chart-4" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-chart-4" style={{ animationDelay: '300ms' }} />
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
                  placeholder="Commande administrateur..."
                  className="h-12 w-full rounded-xl border border-border bg-input pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-chart-4 focus:outline-none focus:ring-1 focus:ring-chart-4"
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-chart-4 text-foreground hover:bg-chart-4/90"
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
