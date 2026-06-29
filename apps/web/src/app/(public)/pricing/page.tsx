import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@qlms/ui";
import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing | Q.LMS",
  description: "Simple, transparent pricing for world-class Islamic education.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for beginners starting their Quranic journey.",
      price: "$49",
      duration: "per month",
      features: [
        "4 Live 1-on-1 Sessions (30 mins)",
        "Access to Basic Learning Materials",
        "Monthly Progress Reports",
        "Email Support",
      ],
      buttonText: "Start Basic",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      description: "Our most popular plan for dedicated learners.",
      price: "$89",
      duration: "per month",
      features: [
        "8 Live 1-on-1 Sessions (45 mins)",
        "Full Access to Learning Library",
        "Detailed Bi-weekly Reports",
        "Priority Support",
        "Session Recordings",
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Intensive",
      description: "For serious students pursuing Hifz or Ijazah.",
      price: "$149",
      duration: "per month",
      features: [
        "12 Live 1-on-1 Sessions (60 mins)",
        "Complete Course Library Access",
        "Weekly Evaluation by Senior Scholar",
        "24/7 Priority Support",
        "Session Recordings & Transcripts",
        "Official Certificate upon completion",
      ],
      buttonText: "Join Intensive",
      buttonVariant: "outline" as const,
      popular: false,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Invest in your hereafter. Choose the plan that best fits your schedule and learning goals. 
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-islamic-green shadow-lg scale-105 z-10' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-islamic-green text-white px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pt-8 pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="pt-2">{plan.description}</CardDescription>
                <div className="pt-6 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">{plan.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-islamic-green shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-6 pb-8">
                <Link href="/register" className="w-full">
                  <Button 
                    variant={plan.buttonVariant === 'default' ? 'default' : 'outline'} 
                    className={`w-full ${plan.buttonVariant === 'default' ? 'bg-islamic-green hover:bg-islamic-green-dark text-white' : ''}`}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section Teaser */}
        <div className="mt-32 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Have questions about our pricing?</h2>
          <p className="text-muted-foreground">
            We offer family discounts and financial aid for those who qualify. Reach out to our support team for more information.
          </p>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
