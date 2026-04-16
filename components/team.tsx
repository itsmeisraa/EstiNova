import { Brain, Code, Database, Palette, Server, Shield } from "lucide-react"

const teamMembers = [
  {
    name: "Boudjaoui Badis",
    role: "Chef de Projet & AI Engineer",
    responsibilities: "Architecture système, orchestration des agents IA, supervision générale",
    icon: Brain
  },
  {
    name: "Chiheb Israa",
    role: "AI Engineer",
    responsibilities: "Prompt Engineering, configuration du pipeline RAG, optimisation des modèles",
    icon: Brain
  },
  {
    name: "Gougam Wiam",
    role: "Frontend Developer",
    responsibilities: "Développement du portail web, conception UI/UX, intégration chatbot",
    icon: Palette
  },
  {
    name: "Mansouri Anias",
    role: "Backend Developer",
    responsibilities: "Authentification silencieuse, API Webhooks, connexion sécurisée",
    icon: Server
  },
  {
    name: "Hamadouche Axcel",
    role: "Data Analyst",
    responsibilities: "Structuration de la base de données, nettoyage et intégrité des données",
    icon: Database
  },
  {
    name: "Naceri Walid",
    role: "Data Analyst",
    responsibilities: "Gestion du Vector Store, conformité RGPD, analyse des logs",
    icon: Shield
  }
]

const poles = [
  {
    name: "Pôle AI Engineering",
    description: "Logique Intelligente",
    color: "accent"
  },
  {
    name: "Pôle Front-Back End",
    description: "Expérience Utilisateur",
    color: "chart-2"
  },
  {
    name: "Pôle Data Analysis",
    description: "Base de Connaissances",
    color: "chart-3"
  }
]

export function Team() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            L&apos;Équipe
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Une équipe pluridisciplinaire
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            6 étudiants de 2ème année Cycle Préparatoire (2CP) de l&apos;ESTIN, 
            répartis en 3 pôles de compétences complémentaires.
          </p>
        </div>

        {/* Poles */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {poles.map((pole, index) => (
            <div key={index} className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-foreground">{pole.name}</span>
              <span className="text-xs text-muted-foreground">• {pole.description}</span>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
                  <member.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-accent">{member.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.responsibilities}
              </p>
            </div>
          ))}
        </div>

        {/* Project Info */}
        <div className="mt-20 rounded-2xl border border-border bg-card p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground">À Propos du Projet</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                EstiNova est développé dans le cadre du module Projets Pluridisciplinaires 
                de l&apos;année universitaire 2025/2026. Le projet vise à créer une solution 
                d&apos;intelligence artificielle centralisée pour l&apos;ESTIN.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-secondary px-4 py-1.5 text-sm text-foreground">
                  2CP • 2025/2026
                </span>
                <span className="rounded-full bg-secondary px-4 py-1.5 text-sm text-foreground">
                  8 Semaines
                </span>
                <span className="rounded-full bg-secondary px-4 py-1.5 text-sm text-foreground">
                  ERP IA
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Établissement</span>
                <span className="text-sm font-medium text-foreground">ESTIN</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Module</span>
                <span className="text-sm font-medium text-foreground">Projets Pluridisciplinaires</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Durée</span>
                <span className="text-sm font-medium text-foreground">S1 à S8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
