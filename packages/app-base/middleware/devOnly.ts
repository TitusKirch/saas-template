export default defineNuxtRouteMiddleware(() => {
  if (process.env.NODE_ENV === 'production') {
    return navigateToLocale({
      name: 'index',
    });
  }
  return;
});
