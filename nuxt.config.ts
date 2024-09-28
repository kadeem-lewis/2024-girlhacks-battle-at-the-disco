// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxt/devtools",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/ui",
    "nuxt-vuefire",
  ],
  vuefire: {
    config: {
      apiKey: "AIzaSyAM-lsu1lvfaeh-QBEBJXdEvMAmSuSBVLQ",

      authDomain: "aux-wars.firebaseapp.com",

      projectId: "aux-wars",

      storageBucket: "aux-wars.appspot.com",

      messagingSenderId: "470027436249",

      appId: "1:470027436249:web:0558aea621107f98457ec8",
    },
    auth: {
      enabled: true,
    },
  },
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
