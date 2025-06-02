"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Zap, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function DashboardNavigation() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm p-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Zap className="h-6 w-6 text-lavender" />
        <span className="text-xl font-bold bg-gradient-to-r from-lavender to-lavender-dark bg-clip-text text-transparent">
          AI Cost Advisor
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-gradient-to-br from-lavender to-lavender-dark text-white text-sm">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
