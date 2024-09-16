import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const { updateUserProfileInformation } = useApiAuth();

  // users/me
  const getCurrentUser = ({ options }: { options?: FetchOptions<UserMeResponse> } = {}) =>
    useApiFetch<UserMeData, UserMeResponse>('users/me', {
      ...options,
    });
  const updateCurrentUser = updateUserProfileInformation;

  // users/me/avatar
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

  // users/me/configurations
  const getCurrentUserConfigurations = ({
    options,
  }: { options?: FetchOptions<UserMeConfigurationResponse> } = {}) =>
    useApiFetch<UserMeConfigurationData, UserMeConfigurationResponse>('users/me/configurations', {
      ...options,
    });
  // users/me/configurations/set
  const setCurrentUserConfigurations = ({
    data,
    options,
  }: {
    data: Ref<UsersMeConfigurationSetRequestData | undefined>;
    options?: FetchOptions<UsersMeConfigurationSetResponse>;
  }) =>
    useApiFetch<UsersMeConfigurationSetRequestData, UsersMeConfigurationSetResponse>(
      'users/me/configurations',
      {
        method: 'PUT',
        body: data,
        ...options,
      }
    );
  const deleteCurrentUserConfiguration = ({
    id,
    data,
    options,
  }: {
    id: number;
    data: Ref<UsersMeConfigurationDeleteRequestData | undefined>;
    options?: FetchOptions<UsersMeConfigurationDeleteResponse>;
  }) =>
    useApiFetch<UsersMeConfigurationDeleteRequestData, UsersMeConfigurationDeleteResponse>(
      `users/me/configurations/${id}`,
      {
        method: 'DELETE',
        body: data,
        ...options,
      }
    );

  return {
    getCurrentUser,
    getCurrentUserAvatar,
    getCurrentUserAvatarPresignedUploadUrl,
    getCurrentUserConfigurations,
    setCurrentUserConfigurations,
    updateCurrentUser,
    deleteCurrentUserConfiguration,
  };
}
