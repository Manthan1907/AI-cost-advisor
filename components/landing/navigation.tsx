"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useState } from "react"
import AuthModal from "@/components/auth/auth-modal"

export default function Navigation() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const handleSignIn = () => {
    setAuthMode("signin")
    setShowAuthModal(true)
  }

  const handleSignUp = () => {
    setAuthMode("signup")
    setShowAuthModal(true)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-lavender" />
            <span className="text-xl font-bold bg-gradient-to-r from-lavender to-lavender-dark bg-clip-text text-transparent">
              AI Cost Advisor
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90 transition-opacity"
              onClick={handleSignUp}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
