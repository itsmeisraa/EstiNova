import { Brain, Code, Database, Palette, Server, Shield, Github, Linkedin } from "lucide-react"

const teamMembers = [
  {
    name: "Boudjaoui Badis",
    role: "Chef de Projet & AI Engineer",
    responsibilities: "Architecture système, orchestration des agents IA, supervision générale",
    icon: Brain,
    github: "https://github.com/Badis-Boudjaoui", // Replace with actual URL
    linkedin: "https://linkedin.com/in/badis" // Replace with actual URL
  },
  {
    name: "Chiheb Israa",
    role: "AI Engineer",
    responsibilities: "Prompt Engineering, configuration du pipeline RAG, optimisation des modèles",
    icon: Brain,
    github: "https://github.com/itsmeisraa", // Replace with actual URL
    linkedin: "https://www.linkedin.com/in/israa-chiheb-aaa3b837a/" // Replace with actual URL
  },
  {
    name: "Gougam Wiam",
    role: "Frontend Developer",
    responsibilities: "Développement du portail web, conception UI/UX, intégration chatbot",
    icon: Palette,
    github: "https://github.com/wiam-gm", // Replace with actual URL
    linkedin: "https://linkedin.com/in/wiam" // Replace with actual URL
  },
  {
    name: "Mansouri Anias",
    role: "Backend Developer",
    responsibilities: "Authentification silencieuse, API Webhooks, connexion sécurisée",
    icon: Server,
    github: "https://github.com/anias", // Replace with actual URL
    linkedin: "https://linkedin.com/in/anias" // Replace with actual URL
  },
  {
    name: "Hamadouche Axcel",
    role: "Data Analyst",
    responsibilities: "Structuration de la base de données, nettoyage et intégrité des données",
    icon: Database,
    github: "https://github.com/Axcelcr7", // Replace with actual URL
    linkedin: "https://linkedin.com/in/axcel" // Replace with actual URL
  },
  {
    name: "Naceri Walid",
    role: "Data Analyst",
    responsibilities: "Gestion du Vector Store, conformité RGPD, analyse des logs",
    icon: Shield,
    github: "https://github.com/walid", // Replace with actual URL
    linkedin: "https://linkedin.com/in/walid" // Replace with actual URL
  }
]

// ... poles array stays the same ...

export function Team() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-secondary/30 to-background">
      {/* ... Section Header and Poles (unchanged) ... */}

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
            
            {/* Social Links */}
            <div className="mt-4 flex gap-3 pt-2 border-t border-border/50">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`GitHub de ${member.name}`}
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ... Project Info (unchanged) ... */}
    </section>
  )
}