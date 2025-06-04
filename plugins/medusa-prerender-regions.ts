import type { StoreRegion } from '@medusajs/types'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('prerender:routes', async (ctx) => {
    const config = useRuntimeConfig()
    const { regions } = await fetch(`${config.public.medusaServerURL}/store/regions`, {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': config.public.medusaPublishableKey || '',
    },
    }).then(res => res.json())
    const countries = regions?.map((region: StoreRegion) => region.countries).flat()
    for (const country of countries) {
    ctx.routes.add(`/${country.iso_2}`)
    }
  })
})