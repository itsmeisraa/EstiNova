import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Sparkles className="h-5 w-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">EstiNova</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              L&apos;Assistant Intelligent Centralisé de l&apos;ESTIN. Un système ERP IA 
              conçu pour unifier tous les flux d&apos;informations pédagogiques et administratifs.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              École Supérieure en Sciences et Technologies de l&apos;Informatique et du Numérique
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#users" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Utilisateurs
                </Link>
              </li>
              <li>
                <Link href="#architecture" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground">Projet</h4>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-muted-foreground">
                Module : Projets Pluridisciplinaires
              </li>
              <li className="text-sm text-muted-foreground">
                Niveau : 2ème Année CP
              </li>
              <li className="text-sm text-muted-foreground">
                Année : 2025/2026
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2025 EstiNova • Équipe 2CP ESTIN
          </p>
          <p className="text-xs text-muted-foreground">
            Développé avec ❤️ pour l&apos;ESTIN
          </p>
        </div>
      </div>
    </footer>
  )
}
