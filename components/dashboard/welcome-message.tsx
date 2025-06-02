"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeMessageProps {
  onNudgeClick: (prompt: string) => void
}

export default function WelcomeMessage({ onNudgeClick }: WelcomeMessageProps) {
  const nudgePrompts = [
    "I want to automate customer support",
    "Compare GPT-4 vs Claude for my use case",
    "Calculate ROI for AI implementation",
    "Optimize our existing AI costs",
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <Card className="bg-gradient-to-br from-cream to-cream-light border-lavender/20 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="text-5xl mb-6">👋</div>
            <h2 className="text-3xl font-bold leading-tight">Welcome to your AI Cost Optimization Advisor!</h2>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground font-medium">Try one of these prompts:</p>
        <div className="grid gap-3 max-w-2xl mx-auto">
          {nudgePrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-left justify-start h-auto p-4 border-lavender/20 hover:bg-lavender/5 hover:border-lavender/40 transition-all duration-200"
              onClick={() => onNudgeClick(prompt)}
            >
              <span className="text-sm font-medium">{prompt}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
