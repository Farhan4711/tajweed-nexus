import { Card, CardContent } from "@qlms/ui";
import { BookOpen, Globe2, Users2, Target } from "lucide-react";

export const metadata = {
  title: "About Us | Q.LMS",
  description: "Learn about our mission to make authentic Islamic education accessible worldwide.",
};

export default function AboutPage() {
  const values = [
    {
      icon: BookOpen,
      title: "Authentic Knowledge",
      description: "We are committed to teaching the Quran and Islamic sciences directly from verified sources, rooted in the classical tradition."
    },
    {
      icon: Globe2,
      title: "Global Accessibility",
      description: "Breaking down geographical barriers to connect eager students with certified scholars from around the world."
    },
    {
      icon: Users2,
      title: "Student-Centric",
      description: "Our platform is built around the student's journey, ensuring personalized attention, flexible scheduling, and clear progression."
    },
    {
      icon: Target,
      title: "Excellence (Ihsan)",
      description: "We strive for excellence in both our technological platform and our educational methodology."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 border-b border-border py-20 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-1/4 -right-10 w-96 h-96 bg-islamic-green rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-80 h-80 bg-gold rounded-full blur-3xl" />
        </div>
        
        <div className="container max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Illuminating Hearts Through <span className="text-islamic-green">Divine Knowledge</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Q.LMS was founded with a single, profound mission: to make authentic, structured, and high-quality Islamic education accessible to everyone, regardless of where they live.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 prose prose-stone dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                The journey of Q.LMS began when a group of educators realized the growing disconnect between students in the West and certified Islamic scholars in the East. While the desire to learn the Quran was immense, finding qualified teachers who could offer structured, verified education online was incredibly difficult.
              </p>
              <p className="text-lg text-muted-foreground">
                We built Q.LMS not just as a tutoring service, but as a comprehensive Learning Management System designed specifically for Islamic sciences. Our platform ensures that every teacher holds a verifiable Ijazah, and every student receives a structured curriculum with tracked progress.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted rounded-2xl h-48 w-full"></div>
                <div className="bg-islamic-green/10 rounded-2xl h-64 w-full"></div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gold/10 rounded-2xl h-64 w-full"></div>
                <div className="bg-muted rounded-2xl h-48 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-muted/30 py-20 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide our platform, our teaching methodology, and our community.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="bg-card border-border hover:border-islamic-green/50 transition-colors">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-islamic-green/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-islamic-green" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
