import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

export default defineNuxtRouteMiddleware((to) => {
  const currentUserStore = useCurrentUserStore();

  if (!currentUserStore.isAuthenticated) {
    return navigateToLocale({
      name: 'auth-login',
      query: {
        redirect: to.fullPath !== '/' ? to.fullPath : undefined,
      },
    });
  }
});
