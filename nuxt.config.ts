// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  srcDir: 'src/',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
  ],
  supabase: {
    redirect: true,
  },
})
