import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart, Zap, TrendingUp, Shield, Users } from "lucide-react"
import HeroSection from "@/components/landing/hero-section"
import FeatureCard from "@/components/landing/feature-card"
import TestimonialCard from "@/components/landing/testimonial-card"
import PricingCard from "@/components/landing/pricing-card"
import Navigation from "@/components/landing/navigation"

export default function LandingPage() {

  console.log('Landing Page - Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Landing Page - Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-lavender to-lavender-dark text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">AI Cost Advisor</h1>
              <p className="mt-4 text-lg md:text-xl">
                Optimize your AI spending with smart insights and recommendations.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-lavender shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Try Demo
                </Link>
                {/* Add another button for a different call to action if needed */}
                {/* <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white px-8 text-sm font-medium shadow transition-colors hover:bg-white hover:text-lavender focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Cards */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="bg-gradient-to-br from-cream to-cream-light border-lavender/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-lavender to-lavender-dark rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cost Intelligence</h3>
                  <p className="text-muted-foreground">Precise calculations for any AI implementation</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-cream to-cream-light border-lavender/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-lavender to-lavender-dark rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Smart Analysis</h3>
                  <p className="text-muted-foreground">Compare models with data-driven insights</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-cream to-cream-light border-lavender/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-lavender to-lavender-dark rounded-lg flex items-center justify-center mx-auto mb-4">
                    <PieChart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Clear ROI</h3>
                  <p className="text-muted-foreground">Visualize savings and payback periods</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-cream">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Enterprise AI Decisions
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to make informed decisions about your AI investments
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8" />}
                title="Real-time Pricing Data"
                description="Access up-to-date pricing information from all major AI providers"
              />
              <FeatureCard
                icon={<LineChart className="h-8 w-8" />}
                title="Multi-model Comparisons"
                description="Compare performance and costs across different AI models"
              />
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8" />}
                title="Token Optimization"
                description="Strategies to reduce token usage while maintaining quality"
              />
              <FeatureCard
                icon={<PieChart className="h-8 w-8" />}
                title="Visual Cost Breakdowns"
                description="Clear visualizations of your AI spending and projections"
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title="Export Detailed Reports"
                description="Generate comprehensive PDF and DOCX reports for stakeholders"
              />
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Enterprise-ready Insights"
                description="Industry-specific benchmarks and recommendations"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Three simple steps to optimize your AI investments
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="relative">
                <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-lavender to-lavender-dark hidden md:block"></div>
                <div className="space-y-8">
                  {[
                    {
                      step: "1",
                      title: "Describe your needs",
                      description:
                        "Tell us about your AI use cases, requirements, and goals through our intuitive chat interface",
                    },
                    {
                      step: "2",
                      title: "Get comprehensive analysis",
                      description:
                        "Receive detailed cost breakdowns, model comparisons, and ROI projections tailored to your needs",
                    },
                    {
                      step: "3",
                      title: "Make confident decisions",
                      description: "Use data-driven insights and detailed reports to optimize your AI investments",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lavender to-lavender-dark text-white font-bold text-xl flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="pt-4">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-cream">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Industry Leaders
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See what our customers are saying about AI Cost Advisor
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              <TestimonialCard
                quote="AI Cost Advisor helped us save 40% on our LLM implementation costs while improving performance."
                author="Sarah Johnson"
                role="CTO, TechCorp"
                avatar="SJ"
              />
              <TestimonialCard
                quote="The ROI projections were spot-on and helped us secure budget approval for our AI initiatives."
                author="Michael Chen"
                role="VP of Innovation, Global Finance"
                avatar="MC"
              />
              <TestimonialCard
                quote="We've been able to optimize our token usage and reduce costs by 35% without sacrificing quality."
                author="Emily Rodriguez"
                role="AI Program Manager, RetailGiant"
                avatar="ER"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that's right for your organization
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              <PricingCard
                title="Starter"
                price="$99"
                period="/month"
                description="Perfect for small teams exploring AI"
                features={["Basic cost analysis", "3 model comparisons", "Basic reports", "Email support"]}
                buttonText="Get Started"
                buttonLink="/contact"
                popular={false}
              />
              <PricingCard
                title="Professional"
                price="$299"
                period="/month"
                description="Ideal for growing businesses"
                features={[
                  "Advanced cost analysis",
                  "Unlimited model comparisons",
                  "Custom reports",
                  "ROI projections",
                  "Priority support",
                ]}
                buttonText="Get Started"
                buttonLink="/contact"
                popular={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                period=""
                description="For large organizations with complex needs"
                features={[
                  "Enterprise-grade analysis",
                  "Custom integrations",
                  "Dedicated account manager",
                  "On-premise options",
                  "24/7 support",
                ]}
                buttonText="Contact Sales"
                buttonLink="/contact"
                popular={false}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-lavender to-lavender-dark">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to optimize your AI costs?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Get started today and make smarter AI investment decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/dashboard">
                  <Button className="bg-white text-lavender-dark hover:bg-white/90 transition-colors">Try Demo</Button>
                </Link>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-lavender" />
                <span className="text-xl font-bold">AI Cost Advisor</span>
              </div>
              <p className="text-sm text-muted-foreground">Smart AI investment decisions for enterprises</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/dashboard">Demo</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/documentation">Documentation</Link>
                </li>
                <li>
                  <Link href="/api-reference">API Reference</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 AI Cost Advisor. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
