export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUsers();

  if (to.path == "/auth") return;

  if (!user.userData) {
    return navigateTo("/auth");
  }

  if (user.userData && !(user.userData as any).role.includes("ADMIN")) {
    return abortNavigation();
  }
});
