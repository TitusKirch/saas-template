export default defineNuxtRouteMiddleware(() => {
  const runtimeConfig = useRuntimeConfig();

  if (!runtimeConfig.public.authPagesActive) {
    return false;
  }
});
