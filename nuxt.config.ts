import type { StoreRegion } from '@medusajs/types'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxtjs/medusa',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    // Ignored the deployment to NuxtHub
    // '@nuxthub/core',
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
    public: {
      medusaServerURL: import.meta.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL,
      medusaPublishableKey: import.meta.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
      stripeKey: import.meta.env.NUXT_PUBLIC_STRIPE_KEY || '',
    },
  },

  routeRules: {
    '/**/': { prerender: true },
    '/**/products/**': { ssr: true },
    '/**/collections/**': { ssr: true },
    '/**/categories/**': { ssr: true },
    '/**/account': { ssr: true },
    '/**/store': { ssr: true },
    '/**/cart': { ssr: true },
    '/**/checkout': { ssr: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: true,
  },
  compatibilityDate: '2024-11-06',

  // [BUG]: Failed to parse URL from undefined/store/regions - [cause]: Invalid URL
  // hooks: {
  //   async 'prerender:routes'(ctx) {
  //     const { regions } = await fetch(`${process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL}/store/regions`, {
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-publishable-api-key': process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
  //       },
  //     }).then(res => res.json())
  //     const countries = regions?.map((region: StoreRegion) => region.countries).flat()
  //     for (const country of countries) {
  //       ctx.routes.add(`/${country.iso_2}`)
  //     }
  //   },
  // },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  medusa: {
    baseUrl: import.meta.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL,
    publishableKey: import.meta.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    server: true,
  },
})
