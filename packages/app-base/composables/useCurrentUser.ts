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
  const updateCurrentUser = ({ data }: { data: Ref<UpdateUserMeData | undefined> }) => {
    const { put } = useApi();

    return put<UpdateUserMeData, UpdateUserMeResponse>('auth/user/profile-information', {
      immediate: false,
      watch: false,
      version: 'v1',
      body: data,
    });
  };
  const refetchCurrentUser = async () => {
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
  const getAvatarPresignedUploadUrl = ({
    data,
  }: {
    data: Ref<UserMeAvatarPresignedUploadData | undefined>;
  }) => {
    const { post } = useApi();
    return post<UserMeAvatarPresignedUploadData, UserMeAvatarPresignedUploadResponse>(
      'users/me/avatar/presigned',
      {
        immediate: false,
        watch: false,
        setDefaultContentType: false,
        body: data,
      }
    );
  };
  const avatar = async () => {
    const currentUserStore = useCurrentUserStore();
    await currentUserStore.fetchAvatar();
    return computed(() => {
      return currentUserStore.avatar;
    });
  };
  const refetchAvatar = async () => {
    const currentUserStore = useCurrentUserStore();
    await currentUserStore.fetchAvatar({
      force: true,
    });
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
    avatar,
    currentUser,
    emailIsVerified,
    getAvatarPresignedUploadUrl,
    hasPassword,
    isAuthenticated,
    logout,
    refetchAvatar,
    refetchCurrentUser,
    resendVerificationEmail,
    reset,
    updateCurrentUser,
  };
}
