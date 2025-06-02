import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white border-lavender/20 transition-all duration-300 hover:shadow-lg hover:border-lavender/50 group">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-gradient-to-br from-lavender to-lavender-dark rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
