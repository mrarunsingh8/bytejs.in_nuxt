// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // keep SSR globally ON
  nitro: {
    preset: 'cloudflare' // or node-server, cloudflare, vercel, etc
  },
  app: {
    pageTransition: { name: 'page', mode: 'in-out' },
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://www.googletagmanager.com'
        },
        {
          rel: 'canonical',
          href: 'https://www.bytejs.in/'
        }
      ],
      script: [
        {
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TKQRN7S5');
          `,
          type: 'text/javascript'
        }
      ],
      noscript: [
        {
          innerHTML: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TKQRN7S5"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `
        }
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/seo'
  ],

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
    enabled: true
  },

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
