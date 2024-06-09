export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated()) {
    return navigateToLocale({
      name: 'auth-login',
      query: { redirect: to.fullPath },
    });
  }
});
