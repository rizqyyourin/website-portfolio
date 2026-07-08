import { defineEventHandler, setHeader } from 'h3'
import { navigation, projects } from '../../app/data/content'

export default defineEventHandler(async (event) => {
  const baseURL = useRuntimeConfig(event).public.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  const sectionUrls = navigation
    .filter(item => item.href !== '#home')
    .map(item => `  <url>
    <loc>${baseURL}/${item.href}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)

  const projectUrls = projects
    .filter(project => project.link)
    .map(project => `  <url>
    <loc>${project.link}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseURL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${[...sectionUrls, ...projectUrls].join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
