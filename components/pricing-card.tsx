import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${popular ? "border-lavender shadow-lg relative" : "border-lavender/20"}`}>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-lavender text-white text-sm font-medium px-3 py-1 rounded-full">Most Popular</span>
        </div>
      )}
      <CardHeader className="pb-0">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="ml-1 text-muted-foreground">/month</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-lavender mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${popular ? "bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90" : "bg-lavender/10 text-lavender-dark hover:bg-lavender/20"}`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
