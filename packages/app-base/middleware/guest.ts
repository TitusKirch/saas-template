import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

export default defineNuxtRouteMiddleware(() => {
  const currentUserStore = useCurrentUserStore();
  if (currentUserStore.isAuthenticated) {
    return navigateToLocale({
      name: 'index',
    });
  }
});
