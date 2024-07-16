import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
import { useAuthStore } from '@tituskirch/app-base/stores/auth';

export default function () {
  // me
  const currentUser = async () => {
    const currentUserStore = useCurrentUserStore();
    await currentUserStore.fetchUser();
    return computed(() => {
      return currentUserStore.user;
    });
  };
  const update = ({ data }: { data: Ref<UpdateUserMeData | undefined> }) => {
    const { put } = useApi();

    return put<UpdateUserMeData, UpdateUserMeResponse>('auth/user/profile-information', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };

  const refetch = async () => {
    const currentUserStore = useCurrentUserStore();
    await currentUserStore.fetchUser({
      force: true,
    });
  };
  const isAuthenticated = () => {
    const currentUserStore = useCurrentUserStore();
    return !!currentUserStore.user;
  };
  const emailIsVerified = () => {
    const currentUserStore = useCurrentUserStore();
    return currentUserStore.user?.email_verified_at !== null;
  };
  const hasPassword = () => {
    const currentUserStore = useCurrentUserStore();
    return currentUserStore.user?.has_password ?? false;
  };

  // me/avatar
  const getAvatarPresignedUploadUrl = async ({
    data,
  }: {
    data: Ref<UserMeAvatarPresignedUploadData> | undefined;
  }) => {
    const { post } = useApi();
    return post<UserMeAvatarPresignedUploadData, UserMeAvatarPresignedUploadResponse>(
      'users/me/avatar/presigned-url',
      {
        immediate: false,
        watch: false,
        setDefaultContentType: false,
        body: data,
      }
    );
  };

  // general
  const reset = () => {
    const currentUserStore = useCurrentUserStore();
    currentUserStore.reset();
  };
  const logout = async () => {
    const { logout } = useAuth();
    const { execute } = logout();
    await execute();
    reset();
    const authStore = useAuthStore();
    authStore.reset();
  };
  const resendVerificationEmail = async () => {
    const { emailVerificationNotification } = useAuth();
    const { execute } = emailVerificationNotification();
    await execute();

    const { t } = useNuxtApp().$i18n;
    useNotification({
      title: t('user.resendVerificationEmail.notification.success.title'),
      description: t('user.resendVerificationEmail.notification.success.description'),
      type: 'success',
    });
  };

  return {
    currentUser,
    emailIsVerified,
    getAvatarPresignedUploadUrl,
    hasPassword,
    isAuthenticated,
    logout,
    refetch,
    resendVerificationEmail,
    reset,
    update,
  };
}
