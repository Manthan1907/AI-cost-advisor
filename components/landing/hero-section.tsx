import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-cream via-cream-light to-lavender/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Smart AI Investment Decisions for{" "}
              <span className="bg-gradient-to-r from-lavender to-lavender-dark bg-clip-text text-transparent">
                Enterprises
              </span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get instant cost analysis, ROI projections, and optimization strategies for your AI initiatives
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90 transition-opacity">
                  Try Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="border-lavender text-lavender-dark hover:bg-lavender/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-lavender/20 to-cream rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-lavender/20 rounded-full filter blur-xl animate-pulse"></div>
                  <div
                    className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-cream-dark/30 rounded-full filter blur-lg animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col">
                    <div className="w-full h-3 bg-gradient-to-r from-lavender/30 to-cream/50 rounded-full mb-4"></div>
                    <div className="w-3/4 h-2 bg-lavender/20 rounded-full mb-8"></div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-cream/50 to-lavender/10 rounded-lg"></div>
                      <div className="bg-gradient-to-br from-lavender/10 to-cream/30 rounded-lg"></div>
                      <div className="bg-gradient-to-br from-lavender/20 to-cream/20 rounded-lg"></div>
                      <div className="bg-gradient-to-br from-cream-dark/20 to-lavender/15 rounded-lg"></div>
                    </div>
                    <div className="mt-6 h-20 bg-gradient-to-r from-lavender/20 via-cream/30 to-lavender/10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
