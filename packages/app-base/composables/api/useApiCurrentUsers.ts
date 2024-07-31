import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const { updateUserProfileInformation } = useApiAuth();

  const getCurrentUser = ({ options }: { options?: FetchOptions<UserMeResponse> } = {}) =>
    useApiFetch<UserMeData, UserMeResponse>('users/me', {
      ...options,
    });
  const updateCurrentUser = updateUserProfileInformation;

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
    getCurrentUserAvatar,
    getCurrentUserAvatarPresignedUploadUrl,
    updateCurrentUser,
  };
}
