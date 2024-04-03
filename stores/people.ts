export const usePeople = defineStore("people", {
  state: () => ({
    people: [] as PersonResponse[],
  }),
  actions: {
    async getList() {
      try {
        const { data, execute, error, pending } = await useApi<
          PersonResponse[]
        >("/backoffice/people", {
          method: "get",
        });

        if (data) {
          this.people = (data.value as any).data;
        }
      } catch (e) {
        this.people = [];
      }
    },
  },
});
