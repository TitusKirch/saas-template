export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated()) {
    return navigateToLocale({
      name: 'index',
    });
  }
});
