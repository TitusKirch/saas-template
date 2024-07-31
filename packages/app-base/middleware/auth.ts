export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useNewCurrentUser();

  if (!isAuthenticated) {
    return navigateToLocale({
      name: 'auth-login',
      query: {
        redirect: to.fullPath !== '/' ? to.fullPath : undefined,
      },
    });
  }
});
