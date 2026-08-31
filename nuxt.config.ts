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
          content: 'Portfolio of Ahmad Rizqy Yourin — Fullstack Developer based in Indonesia specializing in Nuxt, Vue.js, Laravel, Go, and PostgreSQL. View projects, skills, and experience in building scalable web applications.'
        },
        {
          name: 'keywords',
          content: 'Ahmad Rizqy Yourin, yourin, Fullstack Developer Indonesia, Web Developer, Nuxt developer, Vue.js developer, Laravel developer, Go developer, PHP, TypeScript, Tailwind CSS, PostgreSQL, REST API, hire fullstack developer'
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        },
        {
          name: 'author',
          content: 'Ahmad Rizqy Yourin'
        },
        {
          name: 'theme-color',
          content: '#000000'
        },
        {
          name: 'geo.region',
          content: 'ID'
        },
        {
          name: 'geo.placename',
          content: 'Indonesia'
        },
        {
          name: 'geo.position',
          content: '-6.2088;106.8456'
        },
        {
          name: 'ICBM',
          content: '-6.2088, 106.8456'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: 'Ahmad Rizqy Yourin — Fullstack Developer'
        },
        {
          property: 'og:locale',
          content: 'en_US'
        },
        {
          property: 'og:locale:alternate',
          content: 'id_ID'
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
          property: 'og:image:alt',
          content: 'Ahmad Rizqy Yourin - Fullstack Developer'
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
          name: 'twitter:image:alt',
          content: 'Ahmad Rizqy Yourin - Fullstack Developer'
        },
        {
          name: 'twitter:creator',
          content: '@yourin'
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
        { rel: 'alternate', hreflang: 'en', href: siteUrl },
        { rel: 'alternate', hreflang: 'x-default', href: siteUrl },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: 'Ahmad Rizqy Yourin - Fullstack Developer',
                description: 'Portfolio of Ahmad Rizqy Yourin, a Fullstack Developer based in Indonesia specializing in Nuxt, Vue.js, Laravel, Go, and PostgreSQL.',
                inLanguage: 'en',
                publisher: { '@id': `${siteUrl}/#person` }
              },
              {
                '@type': 'Person',
                '@id': `${siteUrl}/#person`,
                name: 'Ahmad Rizqy Yourin',
                url: siteUrl,
                email: 'rizqyyourin6@gmail.com',
                jobTitle: 'Fullstack Developer',
                description: 'Fullstack Developer based in Indonesia specializing in building scalable web applications with Nuxt, Vue.js, Laravel, Go, and PostgreSQL.',
                image: `${siteUrl}/images/profile.jpg`,
                nationality: {
                  '@type': 'Country',
                  name: 'Indonesia'
                },
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'ID',
                  addressLocality: 'Indonesia'
                },
                alumniOf: {
                  '@type': 'CollegeOrUniversity',
                  name: 'Diponegoro University',
                  sameAs: 'https://www.undip.ac.id'
                },
                knowsLanguage: ['en', 'id'],
                sameAs: [
                  'https://www.upwork.com/freelancers/~01103c6049d69f345f',
                  'https://github.com/rizqyyourin',
                  'https://linkedin.com/in/rizqyyourin',
                  'https://instagram.com/rizqyyourin',
                  'https://www.threads.com/@rizqyyourin'
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
                  'WebSockets',
                  'Multi-Tenant Architecture',
                  'OpenAPI',
                  'AsyncAPI'
                ],
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Fullstack Development Services',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'Fullstack Web Development',
                        description: 'End-to-end web application development using Nuxt, Vue.js, Laravel, Go, and PostgreSQL.'
                      }
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'Backend API Development',
                        description: 'REST and WebSocket API design, implementation, and documentation using OpenAPI/AsyncAPI specs.'
                      }
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'Service',
                        name: 'SaaS & Multi-Tenant Architecture',
                        description: 'Schema-based multi-tenant isolation, SLA automation, and analytics dashboard engineering.'
                      }
                    }
                  ]
                }
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What does Ahmad Rizqy Yourin specialize in?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Ahmad Rizqy Yourin is a Fullstack Developer based in Indonesia specializing in Nuxt, Vue.js, Laravel, Go, and PostgreSQL — building scalable web applications, REST and WebSocket APIs, and multi-tenant SaaS platforms.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Is Ahmad Rizqy Yourin available for freelance work?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. He is available for freelance fullstack development through Upwork. You can contact him via the form on this portfolio or directly through the Upwork profile linked in the Contact section.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What tech stack does Yourin use?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Primary stacks include TALL (Tailwind, Alpine.js, Laravel, Livewire), VILT (Vue, Inertia, Laravel, Tailwind), and Hyper-Go-Nuxt (Hypervel/Goravel + Nuxt). Languages: JavaScript, TypeScript, PHP, Go, Python.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Where is Yourin located?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Based in Indonesia. Open to remote collaboration and hybrid engagements.'
                    }
                  }
                ]
              }
            ]
          }),
          key: 'schema-graph'
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
