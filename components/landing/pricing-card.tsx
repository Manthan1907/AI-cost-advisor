import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
  buttonLink: string
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  popular = false,
  buttonLink,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col relative ${popular ? "border-lavender shadow-xl scale-105" : "border-lavender/20"}`}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-lavender to-lavender-dark text-white text-sm font-medium px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="pb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="ml-1 text-muted-foreground">{period}</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-lavender mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={buttonLink} className="w-full">
          <Button
            className={`w-full ${
              popular
                ? "bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90"
                : "bg-lavender/10 text-lavender-dark hover:bg-lavender/20"
            }`}
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
