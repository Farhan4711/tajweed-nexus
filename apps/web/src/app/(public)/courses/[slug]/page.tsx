import { db } from "@qlms/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Badge, Avatar, AvatarFallback, AvatarImage, Tabs, TabsContent, TabsList, TabsTrigger } from "@qlms/ui";
import { Clock, Users, Star, CheckCircle2, ChevronRight, GraduationCap } from "lucide-react";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CoursePageProps) {
  const course = await db.course.findUnique({
    where: { slug: params.slug },
  });

  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} | Q.LMS`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: {
      teachers: {
        include: { user: true }
      }
    }
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs & Hero */}
      <section className="bg-muted/30 border-b border-border py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 space-y-6">
          <div className="flex items-center text-sm text-muted-foreground space-x-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/courses" className="hover:text-foreground">Courses</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{course.title}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-islamic-green hover:bg-islamic-green-dark">{course.type.replace('_', ' ')}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {course.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-gold fill-gold" />
                  <span className="text-foreground">{course.rating.toFixed(1)}</span>
                  <span>({course.totalRatings} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.enrolledCount} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration || "Self-paced"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="w-full md:w-80 shrink-0 bg-card rounded-xl border border-border shadow-lg p-6 space-y-6 md:-mb-32 relative z-10">
              <div className="text-3xl font-bold text-islamic-green text-center">
                {course.price > 0 ? `$${course.price}` : "Free"}
              </div>
              <div className="space-y-3">
                <Link href="/register" className="w-full block">
                  <Button size="lg" className="w-full bg-islamic-green hover:bg-islamic-green-dark">
                    Enroll Now
                  </Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground">
                  30-day money-back guarantee. No questions asked.
                </p>
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-islamic-green"/> 1-on-1 Interactive Classes</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-islamic-green"/> Flexible Scheduling</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-islamic-green"/> Course Completion Certificate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="flex-1 bg-background py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructors">Instructors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 prose prose-stone dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold">About this course</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                  {" "}This course is meticulously designed to provide you with the foundational and advanced knowledge required to master this subject. With our highly certified instructors, you will experience an immersive learning environment.
                </p>
                <h4 className="text-xl font-semibold mt-8 mb-4">What you will learn</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
                    course.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <CheckCircle2 className="h-5 w-5 text-islamic-green shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{outcome}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 className="h-5 w-5 text-islamic-green shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Master the fundamental rules and application</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 className="h-5 w-5 text-islamic-green shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Develop fluency and confidence</span>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-6">
                <h3 className="text-2xl font-semibold">Course Curriculum</h3>
                <p className="text-muted-foreground">
                  The curriculum is structured into manageable modules to ensure progressive learning.
                </p>
                <div className="border border-border rounded-lg p-8 text-center text-muted-foreground bg-muted/10">
                  Detailed curriculum syllabus is available upon enrollment.
                </div>
              </TabsContent>
              
              <TabsContent value="instructors" className="space-y-6">
                <h3 className="text-2xl font-semibold">Your Instructors</h3>
                <div className="grid gap-6">
                  {course.teachers.map((teacher) => (
                    <div key={teacher.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border border-border bg-card">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={teacher.user.avatar || undefined} />
                        <AvatarFallback className="text-2xl bg-islamic-green/10 text-islamic-green">
                          {teacher.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold">{teacher.user.name}</h4>
                        <div className="text-sm font-medium text-gold flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current" /> {teacher.rating.toFixed(1)} Instructor Rating
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {teacher.bio || "Certified Islamic Scholar and Quran Instructor."}
                        </p>
                        <Link href={`/teachers/${teacher.id}`} className="inline-block mt-2 text-sm font-medium text-islamic-green hover:underline">
                          View Full Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                  {course.teachers.length === 0 && (
                    <p className="text-muted-foreground">Instructors will be assigned shortly.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
