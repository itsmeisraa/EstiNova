"use client"

import { 
  Calendar, 
  GraduationCap, 
  FileText, 
  Users, 
  Mail, 
  BookOpen,
  Shield,
  Globe,
  Zap
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Calendar,
    title: "Emploi du Temps",
    description: "Consultez votre emploi du temps pour n'importe quel jour, avec horaires et salles en temps reel.",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    icon: GraduationCap,
    title: "Resultats Academiques",
    description: "Accedez a vos notes par matiere et obtenez automatiquement le calcul de votre moyenne ponderee.",
    gradient: "from-chart-2/20 to-chart-2/5"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Posez des questions sur le reglement interieur et obtenez des reponses extraites des documents officiels.",
    gradient: "from-chart-3/20 to-chart-3/5"
  },
  {
    icon: Users,
    title: "Annuaire",
    description: "Trouvez le groupe et la section d'un camarade ou l'email de contact d'un enseignant.",
    gradient: "from-chart-4/20 to-chart-4/5"
  },
  {
    icon: Mail,
    title: "Communication",
    description: "Demandez la redaction et l'envoi d'emails formels a vos enseignants directement via l'assistant.",
    gradient: "from-chart-5/20 to-chart-5/5"
  },
  {
    icon: BookOpen,
    title: "Aide Pedagogique",
    description: "Obtenez de l'aide sur des exercices de programmation, des problemes mathematiques ou la redaction.",
    gradient: "from-accent/20 to-accent/5"
  }
]

const highlights = [
  {
    icon: Shield,
    title: "Securite Maximale",
    description: "Matrice de controle d'acces stricte et protection contre le social engineering."
  },
  {
    icon: Globe,
    title: "Multilingue",
    description: "Support du francais, de la darija et de l'anglais avec detection automatique."
  },
  {
    icon: Zap,
    title: "Reponse Instantanee",
    description: "Architecture RAG hybride pour des reponses precises et contextuelles."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Fonctionnalites
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Tout ce dont vous avez besoin, en un seul endroit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            EstiNova centralise tous les flux d&apos;informations pedagogiques et administratifs de l&apos;ESTIN 
            en un point d&apos;entree conversationnel unique.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          ref={ref}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative">
                <motion.div 
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary"
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div 
          className="mt-20 rounded-2xl border border-border bg-gradient-to-b from-secondary/50 to-background p-8 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid gap-8 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index} 
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <motion.div 
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10"
                  whileHover={{ scale: 1.1 }}
                >
                  <highlight.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
