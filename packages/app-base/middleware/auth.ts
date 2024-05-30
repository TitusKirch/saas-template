export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated()) {
    return navigateToLocale({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  }
});
