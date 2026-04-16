"use client"

import { useState } from "react"
import { GraduationCap, Briefcase, Settings, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const userTypes = [
  {
    id: "student",
    icon: GraduationCap,
    title: "Étudiants",
    subtitle: "1CP, 2CP & 1CS",
    description: "Accédez à vos notes, emplois du temps, règlements et bénéficiez d'une aide pédagogique personnalisée.",
    features: [
      "Consultation des notes et moyennes",
      "Emploi du temps en temps réel",
      "Aide sur les exercices et devoirs",
      "Annuaire des camarades et enseignants",
      "Envoi d'emails aux professeurs",
      "Documentation officielle"
    ],
    color: "accent"
  },
  {
    id: "professor",
    icon: Briefcase,
    title: "Professeurs",
    subtitle: "Corps Enseignant",
    description: "Gérez vos modules, communiquez avec vos étudiants et accédez aux outils pédagogiques adaptés.",
    features: [
      "Liste des groupes et sections",
      "Emplois du temps des modules",
      "Communication ciblée aux étudiants",
      "Signalement des absences de cours",
      "Accès aux contacts étudiants",
      "Documents pédagogiques"
    ],
    color: "chart-2"
  },
  {
    id: "admin",
    icon: Settings,
    title: "Administration",
    subtitle: "Personnel Administratif",
    description: "Supervisez l'activité, gérez les données de scolarité et diffusez les annonces officielles.",
    features: [
      "Tableau de bord de supervision",
      "Mise à jour des données scolarité",
      "Diffusion d'annonces officielles",
      "Gestion documentaire",
      "Logs d'utilisation",
      "Contrôle des accès"
    ],
    color: "chart-3"
  }
]

export function Users() {
  const [activeTab, setActiveTab] = useState("student")
  const activeUser = userTypes.find(u => u.id === activeTab)!

  return (
    <section id="users" className="relative py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Utilisateurs
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Une expérience adaptée à chaque profil
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Grâce à l&apos;authentification silencieuse, EstiNova reconnaît automatiquement votre rôle 
            et adapte l&apos;intégralité de ses réponses en conséquence.
          </p>
        </div>

        {/* User Type Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-xl border border-border bg-card p-1.5">
            {userTypes.map((user) => (
              <button
                key={user.id}
                onClick={() => setActiveTab(user.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                  activeTab === user.id
                    ? "bg-accent text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <user.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{user.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Details */}
        <div className="mt-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left - Info */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <activeUser.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-foreground">{activeUser.subtitle}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                {activeUser.title}
              </h3>
              
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {activeUser.description}
              </p>

              <ul className="mt-8 space-y-4">
                {activeUser.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                <div className="space-y-4">
                  {/* Example Query */}
                  <div className="rounded-xl bg-secondary p-4">
                    <p className="text-xs text-muted-foreground mb-2">Exemple de requête</p>
                    <p className="text-foreground">
                      {activeTab === "student" && "\"Quel est mon emploi du temps demain ?\""}
                      {activeTab === "professor" && "\"Envoyer une annonce au groupe 2CP-A\""}
                      {activeTab === "admin" && "\"Afficher les statistiques d'utilisation\""}
                    </p>
                  </div>

                  {/* Example Response */}
                  <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                    <p className="text-xs text-accent mb-2">Réponse EstiNova</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {activeTab === "student" && "Demain, vous avez Analyse 2 de 8h à 10h en salle A12, puis TP Programmation de 10h15 à 12h15 en salle Info-3..."}
                      {activeTab === "professor" && "Annonce envoyée avec succès à 32 étudiants du groupe 2CP-A. Un récapitulatif a été enregistré dans votre historique."}
                      {activeTab === "admin" && "Cette semaine : 1,247 requêtes traitées, 98.5% de satisfaction, 12 sujets non couverts identifiés. Voir le rapport détaillé."}
                    </p>
                  </div>

                  {/* Access Level Indicator */}
                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
                    <span className="text-sm text-muted-foreground">Niveau d&apos;accès</span>
                    <span className="text-sm font-medium text-accent">
                      {activeTab === "student" && "Personnel"}
                      {activeTab === "professor" && "Module"}
                      {activeTab === "admin" && "Complet"}
                    </span>
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
