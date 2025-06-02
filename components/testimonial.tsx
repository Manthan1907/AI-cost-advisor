import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialProps {
  quote: string
  author: string
  role: string
}

export default function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <Card className="bg-white border-lavender/20">
      <CardContent className="p-6">
        <Quote className="h-6 w-6 text-lavender mb-4" />
        <p className="mb-4 italic">{quote}</p>
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
