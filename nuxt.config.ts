// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@ant-design-vue/nuxt", "@pinia/nuxt"],
  antd: {
    // Options,
  },
  pinia: {
    storesDirs: [
      "./stores/**",
      // './custom-folder/stores/**'
    ],
  },
  future: {
    typescriptBundlerResolution: false,
  },
  experimental: {
    viewTransition: true,
  },
  css: ["@/assets/css/reset.css"],
  runtimeConfig: {
    public: {
      baseApiURL: process.env.API_BASE_URL || "http://localhost:8080/",
    },
    thumbnailBaseUrl: process.env.THUMBNAIL_BASE_URL,
  },
});
