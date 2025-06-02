"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chrome, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
  onModeChange: (mode: "signin" | "signup") => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, just redirect to dashboard
    router.push("/dashboard")
    onClose()
  }

  const handleOAuthLogin = (provider: string) => {
    // For demo purposes, just redirect to dashboard
    router.push("/dashboard")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="bg-gradient-to-r from-lavender to-lavender-dark text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="text-center text-xl">
            {mode === "signin" ? "Welcome Back" : "Get Started"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(value) => onModeChange(value as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:border-lavender focus:ring-lavender/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:border-lavender focus:ring-lavender/20"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="focus:border-lavender focus:ring-lavender/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="focus:border-lavender focus:ring-lavender/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:border-lavender focus:ring-lavender/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:border-lavender focus:ring-lavender/20"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin("google")}>
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin("linkedin")}>
            <Linkedin className="mr-2 h-4 w-4" />
            Continue with LinkedIn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
