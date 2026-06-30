"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Avatar, AvatarFallback } from "@qlms/ui";
import { BookOpen, Users, Globe, Award, CheckCircle2, Star } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-islamic-green/5 blur-3xl" />
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-6"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Master the <span className="text-islamic-green">Holy Quran</span> <br className="hidden md:block"/> with Expert Scholars
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A premium, interactive platform designed to connect you with certified scholars globally for authentic Tajweed, Hifz, and Islamic Studies.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-islamic-green hover:bg-islamic-green-dark">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-islamic-green text-islamic-green hover:bg-islamic-green/5">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="w-full bg-muted/30 py-12 border-y border-border">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: Users, value: "10,000+", label: "Active Students" },
              { icon: Globe, value: "50+", label: "Countries" },
              { icon: Award, value: "200+", label: "Certified Teachers" },
              { icon: BookOpen, value: "15+", label: "Structured Courses" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center gap-2">
                <stat.icon className="h-8 w-8 text-islamic-green mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition / Features Section */}
      <section className="w-full py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose Q.LMS?</h2>
            <p className="text-muted-foreground text-lg">We bring the traditional Madrasah experience to the modern digital age with tools built specifically for Quranic education.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Certified Scholars",
                description: "Learn directly from instructors holding Ijazah in various Qira'at, ensuring authentic transmission of knowledge.",
              },
              {
                title: "Interactive 1-on-1 Classes",
                description: "Experience personalized attention with our integrated high-quality video classrooms and interactive whiteboards.",
              },
              {
                title: "Flexible Scheduling",
                description: "Book classes at times that suit you. Our global network of teachers means you can learn 24/7.",
              }
            ].map((feature, i) => (
              <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow bg-card">
                <CardHeader>
                  <CheckCircle2 className="h-10 w-10 text-gold mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Teaser */}
      <section className="w-full py-24 bg-muted/20 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground text-lg">Start your journey with our carefully structured curriculum designed for all levels.</p>
            </div>
            <Link href="/courses">
              <Button variant="outline" className="hidden md:flex">View All Courses</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Noorani Qaida", level: "Beginner", duration: "3 Months", desc: "The foundational course for beginners to learn the Arabic alphabet and basic pronunciation rules." },
              { title: "Quran Reading with Tajweed", level: "Intermediate", duration: "6 Months", desc: "Learn to recite the Holy Quran fluently with proper application of Tajweed rules." },
              { title: "Quran Memorization (Hifz)", level: "Advanced", duration: "2-3 Years", desc: "A structured program to memorize the entire Quran with regular revision and tracking." },
            ].map((course, i) => (
              <Card key={i} className="flex flex-col h-full overflow-hidden border-border bg-card hover:border-islamic-green/50 transition-colors">
                <div className="h-48 w-full bg-gradient-to-br from-islamic-green/10 to-gold/10 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-islamic-green/40" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold">{course.level}</span>
                    <span className="text-xs font-medium text-muted-foreground">{course.duration}</span>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">{course.desc}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-islamic-green hover:text-islamic-green-dark hover:bg-islamic-green/5">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full md:hidden">View All Courses</Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Student Success Stories</h2>
            <p className="text-muted-foreground text-lg">See what our global community has to say about their learning experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ahmed R.", role: "Parent from UK", text: "The quality of teaching is phenomenal. My son completed his Qaida in just 2 months and is now reading with perfect Tajweed." },
              { name: "Sarah K.", role: "Student from USA", text: "I tried many online platforms, but Q.LMS is by far the most professional. The interactive whiteboard makes learning Arabic so much easier." },
              { name: "Omar Farooq", role: "Hifz Student", text: "The structured tracking system and dedicated teachers helped me memorize 5 Juz in 6 months while managing my university studies." }
            ].map((test, i) => (
              <Card key={i} className="bg-muted/30 border-none shadow-none">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1 text-gold">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-foreground italic leading-relaxed">&ldquo;{test.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <Avatar>
                      <AvatarFallback className="bg-islamic-green/10 text-islamic-green font-semibold">
                        {test.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{test.name}</p>
                      <p className="text-xs text-muted-foreground">{test.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24 bg-islamic-green relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
        
        <div className="container relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Begin Your Quranic Journey Today
          </h2>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
            Join thousands of students and get your first 3 days completely free. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-white text-islamic-green hover:bg-gray-100">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
