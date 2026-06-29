import Link from "next/link";
import { db } from "@qlms/db";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Avatar, AvatarImage, AvatarFallback } from "@qlms/ui";
import { Calendar, Clock, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Blog & Insights",
  description: "Read our latest articles, Quran learning tips, and news from Q.LMS.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: { author: true }
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          Insights, tips, and stories from our scholars and students to inspire your Islamic learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden hover:border-islamic-green/50 transition-colors">
            {/* Thumbnail Placeholder */}
            <Link href={`/blog/${post.slug}`}>
              <div className="h-48 w-full bg-gradient-to-tr from-muted to-muted/50 flex items-center justify-center relative hover:opacity-90 transition-opacity">
                {/* Normally we'd use next/image here with post.thumbnail */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-islamic-green hover:bg-white">{post.category.replace(/_/g, ' ')}</Badge>
                </div>
              </div>
            </Link>
            
            <CardHeader className="pt-6">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unpublished'}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} min read
                </div>
              </div>
              <CardTitle className="line-clamp-2 hover:text-islamic-green transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-6">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-3 pt-4 mt-auto border-t border-border">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar || undefined} />
                  <AvatarFallback className="text-xs bg-islamic-green/10 text-islamic-green">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
                <Link href={`/blog/${post.slug}`} className="ml-auto text-islamic-green">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-islamic-green/10 hover:text-islamic-green">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          No articles published yet. Please check back soon.
        </div>
      )}
    </div>
  );
}
