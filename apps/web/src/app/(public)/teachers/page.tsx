import Link from "next/link";
import { db } from "@qlms/db";
import { Card, CardContent, CardHeader, Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@qlms/ui";
import { Star, MapPin, BookOpen } from "lucide-react";

export const metadata = {
  title: "Our Teachers",
  description: "Learn from highly qualified and certified Islamic scholars from around the world.",
};

export default async function TeachersPage() {
  // Fetch approved teachers
  const teachers = await db.teacherProfile.findMany({
    where: { isApproved: true },
    include: {
      user: true,
      courses: true,
    },
    orderBy: { rating: "desc" }
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Meet Our Scholars</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Our faculty consists of certified instructors holding Ijazah in various Qira&apos;at, dedicated to providing authentic Islamic education.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden hover:border-islamic-green/50 transition-colors flex flex-col">
            <CardHeader className="text-center pt-8 pb-4">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-background shadow-sm">
                <AvatarImage src={teacher.user.avatar || undefined} />
                <AvatarFallback className="text-2xl bg-islamic-green/10 text-islamic-green">
                  {teacher.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{teacher.user.name}</h3>
              
              <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
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
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col items-center text-center space-y-6">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {teacher.bio || "Certified Islamic Scholar and Quran Instructor."}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {teacher.specialisations.slice(0, 3).map((spec, idx) => (
                  <Badge key={idx} variant="secondary" className="font-normal">
                    {spec.replace('_', ' ')}
                  </Badge>
                ))}
                {teacher.specialisations.length > 3 && (
                  <Badge variant="secondary" className="font-normal">
                    +{teacher.specialisations.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="mt-auto pt-6 w-full border-t border-border flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{teacher.courses.length} Courses</span>
                </div>
                <Link href={`/teachers/${teacher.id}`}>
                  <Button variant="ghost" size="sm" className="text-islamic-green hover:text-islamic-green-dark hover:bg-islamic-green/5">
                    View Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teachers.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          No teachers are currently listed. Please check back later.
        </div>
      )}
    </div>
  );
}
