export const usePublishers = defineStore("publishers", {
  state: () => ({
    publishers: [] as PublisherResponse[],
  }),
  actions: {
    async getList() {
      try {
        const { data, execute, error, pending } = await useApi<
          PublisherResponse[]
        >("/backoffice/publishers", {
          method: "get",
        });

        if (data) {
          this.publishers = (data.value as any).data;
        }
      } catch (e) {
        this.publishers = [];
      }
    },
  },
});
