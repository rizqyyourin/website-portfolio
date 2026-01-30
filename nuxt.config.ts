// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-18',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  // SSR - enabled for generic hosting
  ssr: true,

  // Generate static site with index.html


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
  css: ['~/assets/css/main.css'],

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
          content: 'Ahmad Rizqy Yourin - Full-stack Laravel developer. Explore my portfolio of Laravel projects, expertise in Livewire and SaaS solutions. Available for freelance work.'
        },
        {
          name: 'keywords',
          content: 'Ahmad Rizqy Yourin, yourin, Laravel developer, Laravel specialist, PHP developer, web developer, full-stack developer, Livewire'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: 'Ahmad Rizqy Yourin - Laravel Developer'
        },
        {
          property: 'og:description',
          content: 'Full-stack Laravel developer showcasing projects and expertise in Laravel ecosystem, Livewire, and modern web development.'
        },
        {
          property: 'og:url',
          content: 'https://yourin.my.id'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
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
        { children: 'body { background-color: #000000; color: #ffffff; }' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ef4444" width="100" height="100"/><text x="50" y="65" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">Y</text></svg>'
        },
        { rel: 'canonical', href: 'https://yourin.my.id' },
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
            url: 'https://yourin.my.id',
            email: 'contact@yourin.my.id',
            jobTitle: 'Laravel Developer',
            image: 'https://yourin.my.id/images/profile.png',
            sameAs: [
              'https://www.upwork.com/freelancers/~01103c6049d69f345f',
              'https://github.com/rizqyyourin'
            ],
            knowsAbout: [
              'Laravel',
              'PHP',
              'Livewire',
              'Tailwind CSS',
              'Vue.js',
              'JavaScript',
              'MySQL',
              'SQLite'
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

  // Build configuration
  build: {
    transpile: ['flowbite']
  },

  // Vite configuration
  vite: {
    server: {
      hmr: {
        overlay: false
      }
    }
  }
})
