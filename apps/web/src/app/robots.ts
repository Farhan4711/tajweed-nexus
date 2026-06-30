import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.qlms.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/member-area/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
