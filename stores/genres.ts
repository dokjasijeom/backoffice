export const useGenres = defineStore("genres", {
  state: () => ({
    genres: [] as GenreResponse[],
  }),
  actions: {
    async getList() {
      try {
        const { data, execute, error, pending } = await useApi<GenreResponse[]>(
          "/backoffice/genres",
          {
            method: "get",
          }
        );

        if (data) {
          this.genres = (data.value as any).data;
        }
      } catch (e) {
        this.genres = [];
      }
    },
  },
});
