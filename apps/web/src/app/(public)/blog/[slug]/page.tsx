import { db } from "@qlms/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge, Avatar, AvatarImage, AvatarFallback } from "@qlms/ui";
import { Calendar, Clock, ChevronRight, ChevronLeft } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug }
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Q.LMS Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await db.blogPost.findUnique({
    where: { slug: params.slug },
    include: { author: true }
  });

  if (!post) {
    notFound();
  }

  // Very basic Tiptap JSON to HTML converter just for MVP display
  // In a real app, use `@tiptap/react` or a proper HTML renderer
  const renderContent = (content: any) => {
    if (!content || !content.content) return null;
    return content.content.map((block: any, idx: number) => {
      if (block.type === 'paragraph') {
        return (
          <p key={idx}>
            {block.content?.map((textNode: any, i: number) => textNode.text).join('')}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Header / Hero */}
      <header className="bg-muted/30 border-b border-border py-12 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <Badge variant="outline" className="font-normal">{post.category.replace(/_/g, ' ')}</Badge>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar || undefined} />
                  <AvatarFallback className="bg-islamic-green/10 text-islamic-green">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-xs text-muted-foreground">Author</div>
                </div>
              </div>
              
              <div className="h-10 w-px bg-border"></div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unpublished'}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="prose prose-stone dark:prose-invert md:prose-lg max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">#{tag}</Badge>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to all articles
          </Link>
        </div>
      </main>
    </article>
  );
}
