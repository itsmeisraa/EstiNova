import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Users } from "@/components/users"
import { Architecture } from "@/components/architecture"
import { Team } from "@/components/team"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Users />
      <Architecture />
      <Team />
      <Footer />
    </main>
  )
}
