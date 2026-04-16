'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, Mail } from 'lucide-react'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const errorType = searchParams.get('message')

  const isDomainError = errorType === 'domain'

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-6">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-destructive/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-destructive/30 bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20"
            >
              {isDomainError ? (
                <Mail className="h-8 w-8 text-destructive" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              )}
            </motion.div>
            <CardTitle className="text-xl text-foreground">
              {isDomainError ? 'Domaine non autorise' : 'Erreur de connexion'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isDomainError
                ? 'Votre adresse email doit se terminer par @estin.dz'
                : 'Une erreur est survenue lors de la connexion'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isDomainError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg border border-border bg-secondary/50 p-4"
              >
                <p className="text-sm text-muted-foreground">
                  EstiNova est reserve aux membres de l&apos;ESTIN. Veuillez vous connecter avec votre compte institutionnel @estin.dz.
                </p>
              </motion.div>
            )}

            <div className="flex flex-col gap-3">
              <Link href="/auth/login" className="w-full">
                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowLeft className="h-4 w-4" />
                  Reessayer
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full border-border text-foreground">
                  Retour a l&apos;accueil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
