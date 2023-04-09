// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // @ts-ignore
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@huntersofbook/naive-ui-nuxt'
  ],

  auth: {
    // The module is enabled. Change this to disable the module
    isEnabled: true,

    // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
    origin: 'http://localhost:3000',

    // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
    basePath: '/api/auth',
    enableGlobalAppMiddleware: true,
  },
  css: ['/public/app.css'],
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  typescript: {
    shim: false
  },
  tailwindcss: {
    // @ts-ignore
    config: {
      corePlugins: {
        preflight: false,
      }
    }

  }
})


