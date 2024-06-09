import type { NavigateToOptions } from '#app/composables/router';
import type { RouteLocationRaw } from 'vue-router';

export default function (to: RouteLocationRaw, options?: NavigateToOptions) {
  const localePath = useLocalePath();

  return navigateTo(localePath(to), options);
}
