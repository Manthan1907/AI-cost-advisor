import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
}

export default function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="bg-white border-lavender/20 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-6 w-6 text-lavender mb-4" />
        <p className="mb-6 italic flex-1">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lavender to-lavender-dark rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {avatar}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
