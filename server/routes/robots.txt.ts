import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl
  const robots = `User-agent: *
Allow: /
Disallow: /.nuxt/
Disallow: /.output/
Disallow: /node_modules/

Sitemap: ${siteUrl}/sitemap.xml

# Allow faster crawling
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1
`
  
  setHeader(event, 'Content-Type', 'text/plain')
  return robots
})
