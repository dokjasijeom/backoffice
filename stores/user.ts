export const useUsers = defineStore("users", {
  state: () => ({
    userData: useCookie("DS_USER") || null,
    token: useCookie("DS_AUT") || null,
  }),
  actions: {
    async login(email: string, password: string) {
      console.log(useRuntimeConfig());
      try {
        const apiResult = await useFetch("/user/auth", {
          method: "post",
          baseURL: useRuntimeConfig().public.baseApiURL,
          body: { email, password },
        });

        if (apiResult.data) {
          this.userData = (apiResult.data as any).value.data;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
