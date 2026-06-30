import { MetadataRoute } from 'next'
import { db } from '@qlms/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.qlms.com'

  // Get all published courses
  const courses = await db.course.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  })

  // Get all published blog posts
  const blogPosts = await db.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  })

  // Core static routes
  const routes = [
    '',
    '/about',
    '/pricing',
    '/contact',
    '/courses',
    '/teachers',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...courseRoutes, ...blogRoutes]
}
