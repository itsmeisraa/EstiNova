"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Send, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Hero() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis EstiNova, votre assistant intelligent. Comment puis-je vous aider aujourd'hui ?"
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    setMessages([...messages, { role: "user", content: inputValue }])
    setInputValue("")
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Je traite votre demande... Cette fonctionnalité sera bientôt disponible avec l'intégration complète du système."
      }])
    }, 1000)
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Systeme ERP IA pour l&apos;ESTIN
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              L&apos;Assistant Intelligent{" "}
              <span className="text-primary">Centralise</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Accedez instantanement a vos emplois du temps, notes, documents officiels et plus encore. 
              Une interface conversationnelle unique adaptee a votre profil.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/auth/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Commencer Maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  En Savoir Plus
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "24/7", label: "Disponibilite" },
                { value: "3", label: "Profils Utilisateurs" },
                { value: "100%", label: "Securise" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Chat Demo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl border border-border bg-card p-1 shadow-2xl">
              <div className="rounded-xl bg-secondary/30">
                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <motion.div 
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground">EstiNova</p>
                    <p className="text-xs text-muted-foreground">En ligne - Pret a vous aider</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-[300px] overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="border-t border-border p-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Posez votre question..."
                      className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button type="submit" size="icon" className="h-11 w-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div 
              className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border border-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
