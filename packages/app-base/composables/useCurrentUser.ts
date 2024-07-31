import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
import { useAuthStore } from '@tituskirch/app-base/stores/auth';

export default function () {
  const currentUserStore = useCurrentUserStore();
  const currentUserStoreRefs = storeToRefs(currentUserStore);

  // current user
  const { getCurrentUser } = useApiCurrentUsers();
  const {
    data: fetchUserData,
    status: fetchUserStatus,
    execute: fetchCurrentUser,
    error: fetchUserError,
  } = getCurrentUser({
    options: {
      immediate: false,
      watch: false,
    },
  });
  watch(fetchUserData, (newData) => {
    if (!newData?.data) {
      return;
    }
    currentUserStore.setCurrentUser({ user: newData.data });
  });

  // current user avatar url
  const { getCurrentUserAvatar, getCurrentUserAvatarPresignedUploadUrl } = useApiCurrentUsers();
  const {
    data: fetchUserAvatarData,
    status: fetchUserAvatarStatus,
    execute: fetchCurrentUserAvatar,
    error: fetchUserAvatarError,
  } = getCurrentUserAvatar({
    options: {
      immediate: false,
      watch: false,
      lazy: true,
    },
  });
  watch(fetchUserAvatarData, (newData) => {
    if (!newData?.data) {
      return;
    }
    currentUserStore.setCurrentUserAvatarUrl({ avatarUrl: newData.data.presignedUrl });
  });
  const {
    data: fetchUserAvatarPresignedUploadData,
    status: fetchUserAvatarPresignedUploadStatus,
    execute: fetchCurrentUserAvatarPresignedUploadUrl,
    error: fetchUserAvatarPresignedUploadError,
  } = getCurrentUserAvatarPresignedUploadUrl({
    data: currentUserStoreRefs.currentUserAvatarPresignedUploadUrlData,
    options: {
      immediate: false,
      watch: false,
      lazy: true,
    },
  });

  // email verification
  const resendVerificationEmail = async () => {
    const { emailVerificationNotification } = useApiAuth();
    const { execute } = emailVerificationNotification({
      options: {
        immediate: false,
        watch: false,
      },
    });
    await execute();

    const { t } = useNuxtApp().$i18n;
    useNotification({
      title: t('user.resendVerificationEmail.notification.success.title'),
      description: t('user.resendVerificationEmail.notification.success.description'),
      type: 'success',
    });
  };

  // logout
  const logout = async () => {
    const { logout } = useApiAuth();
    const { execute } = logout({
      options: {
        immediate: false,
        watch: false,
      },
    });
    await execute();
    const currentUserStore = useCurrentUserStore();
    currentUserStore.reset();
    const authStore = useAuthStore();
    authStore.reset();
  };

  return {
    ...currentUserStore,
    ...currentUserStoreRefs,
    fetchCurrentUser,
    fetchCurrentUserAvatar,
    fetchCurrentUserAvatarPresignedUploadUrl,
    fetchUserAvatarError,
    fetchUserAvatarPresignedUploadData,
    fetchUserAvatarPresignedUploadError,
    fetchUserAvatarPresignedUploadStatus,
    fetchUserAvatarStatus,
    fetchUserError,
    fetchUserStatus,
    logout,
    resendVerificationEmail,
  };
}
