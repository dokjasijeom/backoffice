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
  css: ["@/assets/css/reset.css"],
  runtimeConfig: {
    public: {
      baseApiURL: process.env.API_BASE_URL || "https://api.doksi.kr/",
    },
    thumbnailBaseUrl: process.env.THUMBNAIL_BASE_URL,
  },
});
