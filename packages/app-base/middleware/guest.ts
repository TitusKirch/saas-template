export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useNewCurrentUser();

  if (isAuthenticated) {
    return navigateToLocale({
      name: 'index',
    });
  }
});
