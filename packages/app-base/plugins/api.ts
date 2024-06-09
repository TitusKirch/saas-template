import { useUserStore } from '@tituskirch/app-base/stores/user';
import { createHttpClient } from './api/httpFactory';

import { FetchError } from 'ofetch';
import { defineNuxtPlugin } from '#app';

/**
 * Handle identity load error
 * @see https://github.com/manchenkoff/nuxt-auth-sanctum/blob/47f7b2e9db0f7e5616fe9dd1e6cec552359e54c8/src/runtime/plugin.ts#L17-L30
 * @param {Error} error
 */
const handleIdentityLoadError = ({ error }: { error: Error }) => {
  if (error instanceof FetchError && error.response && [401, 419].includes(error.response.status)) {
    console.debug(
      'User is not authenticated on plugin initialization, status:',
      error.response.status
    );
  } else {
    console.error('Unable to load user identity from API', error);
  }
};

export default defineNuxtPlugin(async () => {
  const client = createHttpClient();

  const userStore = useUserStore();
  if (!userStore.userLoaded) {
    try {
      const user = await client<UserResponse>('users/me', {
        version: 'v1',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      userStore.setUserData({ data: user.data });
    } catch (error) {
      handleIdentityLoadError({ error: error as Error });
    }
  }

  return {
    provide: {
      apiClient: client,
    },
  };
});
