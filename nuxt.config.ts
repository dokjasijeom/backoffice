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
});
