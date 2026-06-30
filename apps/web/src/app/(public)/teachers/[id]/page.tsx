import { db } from "@qlms/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge, Avatar, AvatarFallback, AvatarImage, Card, Button } from "@qlms/ui";
import { Star, MapPin, Clock, Users, ChevronRight, Award } from "lucide-react";

interface TeacherPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TeacherPageProps) {
  const teacher = await db.teacherProfile.findUnique({
    where: { id: params.id },
    include: { user: true }
  });

  if (!teacher) return { title: "Teacher Not Found" };

  return {
    title: `${teacher.user.name} | Q.LMS`,
    description: teacher.bio || `Profile of ${teacher.user.name}`,
  };
}

export default async function TeacherDetailPage({ params }: TeacherPageProps) {
  const teacher = await db.teacherProfile.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      courses: {
        where: { isPublished: true }
      }
    }
  });

  if (!teacher) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-border bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center text-sm text-muted-foreground space-x-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/teachers" className="hover:text-foreground">Teachers</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{teacher.user.name}</span>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm text-center pt-8 pb-6 bg-card">
            <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-background shadow-sm">
              <AvatarImage src={teacher.user.avatar || undefined} />
              <AvatarFallback className="text-4xl bg-islamic-green/10 text-islamic-green">
                {teacher.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{teacher.user.name}</h1>
            
            <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span className="font-medium text-foreground">{teacher.rating.toFixed(1)}</span>
                <span>({teacher.totalRatings})</span>
              </div>
              {teacher.user.country && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{teacher.user.country}</span>
                </div>
              )}
            </div>

            <div className="mt-8 px-6 space-y-4">
              <div className="flex justify-between items-center text-sm py-3 border-y border-border">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">{teacher.yearsExperience} Years</span>
              </div>
              <div className="flex justify-between items-center text-sm py-3 border-b border-border">
                <span className="text-muted-foreground">Students Taught</span>
                <span className="font-medium">{teacher.studentCount}+</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Bio & Courses */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* About Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">About {teacher.user.name}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {teacher.specialisations.map((spec, idx) => (
                <Badge key={idx} variant="secondary" className="bg-muted/50">
                  {spec.replace('_', ' ')}
                </Badge>
              ))}
            </div>
            <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                {teacher.bio || `${teacher.user.name} is a dedicated and certified Islamic scholar committed to spreading the knowledge of the Holy Quran.`}
              </p>
            </div>
          </section>

          {/* Certifications (Ijazah) */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Certifications & Ijazah</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {teacher.ijazahCerts && teacher.ijazahCerts.length > 0 ? (
                teacher.ijazahCerts.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/20">
                    <Award className="h-6 w-6 text-gold shrink-0" />
                    <div>
                      <p className="font-medium">{cert}</p>
                      <p className="text-xs text-muted-foreground">Verified Certification</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/20">
                  <Award className="h-6 w-6 text-gold shrink-0" />
                  <div>
                    <p className="font-medium">Ijazah in Hafs &apos;an &apos;Asim</p>
                    <p className="text-xs text-muted-foreground">Verified Certification</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Courses Taught by this Teacher */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Courses by {teacher.user.name}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {teacher.courses.map((course) => (
                <Card key={course.id} className="flex flex-col hover:border-islamic-green/50 transition-colors">
                  <div className="p-5 flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">{course.level}</Badge>
                      <div className="font-semibold text-islamic-green">
                        {course.price > 0 ? `$${course.price}` : "Free"}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration || "Self-paced"}</div>
                      <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.enrolledCount}</div>
                    </div>
                  </div>
                  <div className="p-5 pt-0 mt-auto">
                    <Link href={`/courses/${course.slug}`}>
                      <Button variant="secondary" className="w-full">View Course</Button>
                    </Link>
                  </div>
                </Card>
              ))}
              {teacher.courses.length === 0 && (
                <p className="text-muted-foreground col-span-2">This teacher is not currently assigned to any courses.</p>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
