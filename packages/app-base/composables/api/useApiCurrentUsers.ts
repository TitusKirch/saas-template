import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const getCurrentUser = ({ options }: { options?: FetchOptions<UserMeResponse> } = {}) =>
    useApiFetch<UserMeData, UserMeResponse>('users/me', {
      ...options,
    });

  // TODO: Fix type naming
  const updateCurrentUser = async ({
    data,
    options,
  }: {
    data: Ref<UpdateUserMeData>;
    options?: FetchOptions<UpdateUserMeResponse>;
  }) =>
    useApiFetch<UpdateUserMeData, UpdateUserMeResponse>('auth/user/profile-information', {
      method: 'PUT',
      body: data,
      ...options,
    });

  const getCurrentUserAvatar = ({
    options,
  }: { options?: FetchOptions<UserMeAvatarResponse> } = {}) =>
    useApiFetch<UserMeAvatarData, UserMeAvatarResponse>('users/me/avatar', {
      ...options,
    });
  const getCurrentUserAvatarPresignedUploadUrl = ({
    data,
    options,
  }: {
    data: Ref<UserMeAvatarPresignedUploadData | undefined>;
    options?: FetchOptions<UserMeAvatarPresignedUploadResponse>;
  }) =>
    useApiFetch<UserMeAvatarPresignedUploadData, UserMeAvatarPresignedUploadResponse>(
      'users/me/avatar/presigned',
      {
        method: 'POST',
        setDefaultContentType: false,
        body: data,
        ...options,
      }
    );

  return {
    getCurrentUser,
    updateCurrentUser,
    getCurrentUserAvatar,
    getCurrentUserAvatarPresignedUploadUrl,
  };
}
