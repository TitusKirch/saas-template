export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useCurrentUser();

  if (isAuthenticated) {
    return navigateToLocale({
      name: 'index',
    });
  }
});
