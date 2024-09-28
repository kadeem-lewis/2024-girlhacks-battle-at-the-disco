// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/devtools",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/ui",
    "nuxt-vuefire",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  experimental: {
    typedPages: true,
  },
  colorMode: {
    preference: "system",
  },
});