// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/seo'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'in-out' },
    head: {
      /**
       * Preconnect improves GTM performance
       */
      link: [
        {
          rel: 'preconnect',
          href: 'https://www.googletagmanager.com'
        }
      ],

      /**
       * Google Tag Manager (non-blocking)
       */
      script: [
        {
          src: 'https://www.googletagmanager.com/gtm.js?id=GTM-TKQRN7S5',
          async: true
        }
      ],

      /**
       * GTM noscript
       */
      noscript: [
        {
          children:
            '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TKQRN7S5" height="0" width="0" style="display:none;visibility:hidden"></iframe>'
        }
      ]
    }
  },

  site: {
    url: 'https://www.bytejs.in'
  },

  sitemap: {
    strictNuxtContentPaths: true
  },

  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: 'https://www.bytejs.in/sitemap.xml'
  },

  devtools: {
    enabled: false
  },

  compatibilityDate: '2025-01-15',

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    // Override hosting default "content-signal" header on robots.txt
    '/robots.txt': {
      headers: {
        'content-signal': ''
      }
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
