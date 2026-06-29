import Link from "next/link";
import { db } from "@qlms/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Badge, Button } from "@qlms/ui";
import { BookOpen, Clock, Users, Star } from "lucide-react";

export const metadata = {
  title: "All Courses",
  description: "Browse our comprehensive list of Quran, Tajweed, Hifz, and Islamic Studies courses.",
};

export default async function CoursesPage() {
  // Fetch published courses from the database
  const courses = await db.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: {
      teachers: {
        include: { user: true }
      }
    }
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Courses</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover a range of structured programs designed to guide you from basic Quran reading to advanced Tajweed and Hifz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden hover:border-islamic-green/50 transition-colors">
            {/* Course Thumbnail Placeholder */}
            <div className="h-48 w-full bg-gradient-to-br from-islamic-green/10 to-gold/10 flex items-center justify-center relative">
              <BookOpen className="h-16 w-16 text-islamic-green/30" />
              <Badge className="absolute top-4 right-4 bg-white/90 text-islamic-green hover:bg-white">{course.level}</Badge>
            </div>
            
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs uppercase tracking-wider">{course.type.replace('_', ' ')}</Badge>
                <div className="flex items-center text-gold text-xs font-medium ml-auto">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  {course.rating.toFixed(1)} ({course.totalRatings})
                </div>
              </div>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration || "Self-paced"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolledCount} enrolled</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 border-t border-border flex items-center justify-between">
              <div className="font-semibold text-lg text-islamic-green">
                {course.price > 0 ? `$${course.price}` : "Free"}
              </div>
              <Link href={`/courses/${course.slug}`}>
                <Button variant="outline" size="sm" className="hover:bg-islamic-green hover:text-white border-islamic-green text-islamic-green">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          No courses are currently available. Please check back later.
        </div>
      )}
    </div>
  );
}
