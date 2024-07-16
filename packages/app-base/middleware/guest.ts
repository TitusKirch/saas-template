export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useCurrentUser();

  if (isAuthenticated()) {
    return navigateToLocale({
      name: 'index',
    });
  }
});
