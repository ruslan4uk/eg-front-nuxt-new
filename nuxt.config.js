import pkg from './package'
import getSitemap from './utils/getSitemap'

require('dotenv').config();

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  * <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" />
  */
  head: {
    title: 'Excursguide',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'yandex-verification', content: '1b17652caa4578f5' },
      { name: 'google-site-verification', content: 'Jrlf7j1xzEEYlhh8m_Og-nz5Q2Q2zJ_Wch1oqOJCIk4' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/fav_64x64.png' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */

  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/app.sass',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/axios',
    '@/plugins/element-ui',
    '@/plugins/mixins/validation',
    '@/plugins/mixins/init',
    // { src: '~/plugins/laravelEcho', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    // Yandex Metrika
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '54142261',
        clickmap:true,
        // useCDN:false,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
      }
    ],
  ],

  /**
   * Robots
   */
  robots: [
    {
      UserAgent: '*',
      Allow: '/'
    }
  ],

  /**
   * Sitemap
   */

  sitemap: {
    path: '/sitemap.xml',
    routes() {
      return getSitemap();
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true
    }
  },

  /*
  ** Auth module setting
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'data' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/',
      user: '/',
    },
    watchLoggedIn: true,
    rewriteRedirects: true,
    plugins: [
      { src:'~/plugins/laravelEcho.js', ssr: false},
      { src: '~/plugins/axios', ssr: true }
    ]
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    browserBaseURL: process.env.BASE_URL || 'https://api.excursguide.ru/api/v2',
    baseURL: process.env.DOCKER ? 'http://nginx/api/v2' : process.env.BASE_URL,
  },

  /*
  ** Router middleware config
  */
  router: {
    linkActiveClass: 'active',
    middleware: [
      'clearValidationErrors',
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/,/^element-ui-fork/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
