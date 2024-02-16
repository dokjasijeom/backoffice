export const usePublishDays = defineStore("publishDays", {
  state: () => ({
    publishDays: [],
  }),
  actions: {
    async getList() {
      try {
        const { data, execute, error, pending } = await useApi<
          PublishDayResponse[]
        >("/backoffice/publish-days", {
          method: "get",
        });

        if (data) {
          this.publishDays = (data.value as any).data;
        }
      } catch (e) {
        this.publishDays = [];
      }
    },
  },
});
