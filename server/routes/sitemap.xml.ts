import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const baseURL = useRuntimeConfig(event).public.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseURL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseURL}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseURL}/" />
  </url>
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
