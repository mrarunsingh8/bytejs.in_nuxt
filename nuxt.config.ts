// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * We keep SSR enabled globally,
   * but prerender + cache static pages
   */
  ssr: true,

  /**
   * Nitro: Prerender all static pages
   */
  nitro: {
    prerender: {
      routes: [
        '/',
        '/json-formatter',
        '/qr-code-generator',
        '/byteurl',
        '/uuid-generator',
        '/text-case-converter',
        '/http-header-checker'
      ]
    }
  },

  /**
   * Nuxt modules
   */
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/seo'
  ],

  /**
   * Global <head> config
   */
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

  /**
   * SEO module base config
   */
  site: {
    url: 'https://www.bytejs.in',
    name: 'ByteJS',
    description:
      'ByteJS provides free online developer tools like JSON formatter, QR code generator, URL shortener, and more.'
  },

  /**
   * Sitemap generation
   */
  sitemap: {
    strictNuxtContentPaths: true
  },

  /**
   * Robots.txt
   */
  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: 'https://www.bytejs.in/sitemap.xml'
  },

  /**
   * Route-level rules
   */
  routeRules: {
    /**
     * Static + cached pages
     */
    '/': {
      prerender: true,
      cache: { maxAge: 3600 }
    },
    '/json-formatter': {
      prerender: true,
      cache: { maxAge: 3600 }
    },
    '/qr-code-generator': {
      prerender: true,
      cache: { maxAge: 3600 }
    },
    '/byteurl': {
      prerender: true,
      cache: { maxAge: 3600 }
    },
    '/uuid-generator': {
      prerender: true,
      cache: { maxAge: 3600 }
    },
    '/text-case-converter': {
      prerender: true,
      cache: { maxAge: 3600 }
    },
    '/http-header-checker': {
      prerender: true,
      cache: { maxAge: 3600 }
    },

    /**
     * Fix malformed robots.txt header from Cloudflare
     */
    '/robots.txt': {
      headers: {
        'content-signal': ''
      }
    }
  },

  /**
   * Global CSS
   */
  css: ['~/assets/css/main.css'],

  /**
   * Disable devtools in production
   */
  devtools: {
    enabled: false
  },

  /**
   * Compatibility lock
   */
  compatibilityDate: '2025-01-15',

  /**
   * ESLint config
   */
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
