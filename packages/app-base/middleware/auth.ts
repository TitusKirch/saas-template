export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useCurrentUser();

  if (!isAuthenticated.value) {
    return navigateToLocale({
      name: 'auth-login',
      query: {
        redirect: to.fullPath !== '/' ? to.fullPath : undefined,
      },
    });
  }
});
