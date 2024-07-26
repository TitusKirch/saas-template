import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const getUsersMe = ({ options }: { options?: FetchOptions<UserMeResponse> } = {}) =>
    useApiFetch<UserMeData, UserMeResponse>('users/me', {
      ...options,
    });

  return {
    getUsersMe,
  };
}
