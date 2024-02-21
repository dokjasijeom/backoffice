export const useProviders = defineStore("providers", {
  state: () => ({
    providers: [],
  }),
  actions: {
    async getList() {
      try {
        const { data, execute, error, pending } = await useApi<
          ProviderResponse[]
        >("/backoffice/providers", {
          method: "get",
        });

        if (data) {
          this.providers = (data.value as any).data;
        }
      } catch (e) {
        this.providers = [];
      }
    },
  },
});
