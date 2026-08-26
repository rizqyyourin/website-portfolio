const siteUrl =
  (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> }
  }).process?.env?.NUXT_PUBLIC_SITE_URL || 'https://yourin.my.id'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  compatibilityDate: '2025-11-18',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  // SSR - enabled for generic hosting
  ssr: true,

  runtimeConfig: {
    openrouterApiKey: '', // Auto-filled from NUXT_OPENROUTER_API_KEY env var
    public: {
      siteUrl,
    },
  },

  // Modules
  modules: ['@nuxtjs/tailwindcss'],



  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // CSS
  css: [
    '~/assets/css/main.css',
    'aos/dist/aos.css',
    '~/assets/css/aos-custom.css',
  ],

  // Nitro configuration
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt', '/404.html'],
      ignore: ['/admin']
    }
  },

  // App configuration
  app: {
    baseURL: '/',
    head: {
      title: 'Ahmad Rizqy Yourin - Fullstack Developer | Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Ahmad Rizqy Yourin - Fullstack Developer specializing in building modern web applications, scalable backend architectures, and high-performance user interfaces. Explore my portfolio and projects.'
        },
        {
          name: 'keywords',
          content: 'Ahmad Rizqy Yourin, yourin, Fullstack Developer, Web Developer, Nuxt, Vue.js, Go, PHP, Laravel, TypeScript, Tailwind CSS, PostgreSQL, REST API'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: 'Ahmad Rizqy Yourin - Fullstack Developer'
        },
        {
          property: 'og:description',
          content: 'Fullstack Developer crafting scalable backends and modern web applications with Nuxt, Go, PHP, and modern web technologies.'
        },
        {
          property: 'og:url',
          content: siteUrl
        },
        {
          property: 'og:image',
          content: `${siteUrl}/images/profile.jpg`
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:image',
          content: `${siteUrl}/images/profile.jpg`
        },
        {
          name: 'twitter:creator',
          content: '@yourin'
        },
        {
          name: 'author',
          content: 'Ahmad Rizqy Yourin'
        },
        {
          name: 'theme-color',
          content: '#000000'
        }
      ],
      style: [
        { innerHTML: 'body { background-color: #000000; color: #ffffff; }' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ef4444" width="100" height="100"/><text x="50" y="65" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">Y</text></svg>'
        },
        { rel: 'canonical', href: siteUrl },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Ahmad Rizqy Yourin',
            url: siteUrl,
            email: 'rizqyyourin6@gmail.com',
            jobTitle: 'Fullstack Developer',
            image: `${siteUrl}/images/profile.jpg`,
            sameAs: [
              'https://www.upwork.com/freelancers/~01103c6049d69f345f',
              'https://github.com/rizqyyourin'
            ],
            knowsAbout: [
              'JavaScript',
              'TypeScript',
              'PHP',
              'Go',
              'Python',
              'Vue.js',
              'Nuxt',
              'Laravel',
              'Tailwind CSS',
              'PostgreSQL',
              'MySQL',
              'Redis',
              'Docker',
              'REST API',
              'WebSockets'
            ]
          }),
          key: 'schema-person'
        }
      ]
    }
  },

  // Experimental features - disable payload extraction to avoid dev.json 404
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false
  },

  // Vite configuration
  vite: {
    server: {
      hmr: {
        overlay: false
      }
    }
  }
}
