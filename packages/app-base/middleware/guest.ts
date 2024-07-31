export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useCurrentUser();

  if (isAuthenticated.value) {
    return navigateToLocale({
      name: 'index',
    });
  }
});
