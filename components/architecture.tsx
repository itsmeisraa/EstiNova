import { 
  Database, 
  Brain, 
  Server, 
  Lock,
  ArrowRight,
  Cpu,
  HardDrive,
  Globe
} from "lucide-react"

const architectureSteps = [
  {
    step: "01",
    icon: Globe,
    title: "Interface Utilisateur",
    description: "L'utilisateur soumet un message via le widget chatbot intégré au portail web."
  },
  {
    step: "02",
    icon: Lock,
    title: "Authentification",
    description: "Le système récupère automatiquement le profil complet via authentification silencieuse."
  },
  {
    step: "03",
    icon: Brain,
    title: "Agent Orchestrateur",
    description: "L'agent principal détermine quel agent spécialisé appeler selon le profil et l'intention."
  },
  {
    step: "04",
    icon: Database,
    title: "Retrieval de Données",
    description: "L'agent interroge les sources appropriées : Vector Store ou base de données dynamique."
  }
]

const techStack = [
  {
    category: "IA & NLP",
    items: [
      { name: "n8n", description: "Orchestration" },
      { name: "LLM", description: "Traitement NLP" },
      { name: "RAG", description: "Retrieval" }
    ]
  },
  {
    category: "Données",
    items: [
      { name: "Vector Store", description: "Documents" },
      { name: "Google Sheets", description: "Dynamique" },
      { name: "HuggingFace", description: "Embeddings" }
    ]
  },
  {
    category: "Sécurité",
    items: [
      { name: "HTTPS", description: "Chiffrement" },
      { name: "Silent Auth", description: "Identité" },
      { name: "RBAC", description: "Contrôle" }
    ]
  }
]

export function Architecture() {
  return (
    <section id="architecture" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Architecture
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Une architecture multi-agents évolutive
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Le cœur d&apos;EstiNova repose sur une architecture orchestrée par un agent principal, 
            conçue pour s&apos;adapter à l&apos;ajout de nouvelles fonctionnalités.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="mt-16">
          <div className="grid gap-4 md:grid-cols-4">
            {architectureSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="rounded-2xl border border-border bg-card p-6 h-full">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-accent">{step.step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <step.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < architectureSteps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <h3 className="text-center text-xl font-semibold text-foreground mb-8">
            Stack Technologique
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {techStack.map((category, index) => (
              <div key={index} className="rounded-2xl border border-border bg-gradient-to-b from-card to-secondary/20 p-6">
                <div className="mb-4 flex items-center gap-3">
                  {index === 0 && <Cpu className="h-5 w-5 text-accent" />}
                  {index === 1 && <HardDrive className="h-5 w-5 text-accent" />}
                  {index === 2 && <Server className="h-5 w-5 text-accent" />}
                  <h4 className="font-semibold text-foreground">{category.category}</h4>
                </div>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-2.5">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAG Pipeline */}
        <div className="mt-20 rounded-2xl border border-accent/30 bg-accent/5 p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Pipeline RAG</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Le pipeline RAG (Retrieval-Augmented Generation) permet d&apos;interroger les documents 
                officiels de l&apos;ESTIN en langage naturel avec une précision maximale.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground">
                    <strong>Indexation automatique</strong> : Tout nouveau document est vectorisé et inséré automatiquement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground">
                    <strong>Recherche sémantique</strong> : Les passages les plus pertinents sont retournés à l&apos;agent.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground">
                    <strong>Zéro hallucination</strong> : Si aucune donnée n&apos;est disponible, le système l&apos;indique explicitement.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">PDF</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">EMB</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">VEC</span>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="text-xs text-muted-foreground">
                    Documents indexés : Règlement intérieur, Calendrier académique, Circulaires, Programmes scolaires
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
