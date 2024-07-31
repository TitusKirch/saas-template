import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

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

  return {
    ...currentUserStore,
    ...currentUserStoreRefs,
    fetchCurrentUser,
    fetchCurrentUserAvatar,
    fetchUserAvatarError,
    fetchUserAvatarStatus,
    fetchUserError,
    fetchUserStatus,
    fetchCurrentUserAvatarPresignedUploadUrl,
    fetchUserAvatarPresignedUploadError,
    fetchUserAvatarPresignedUploadStatus,
    fetchUserAvatarPresignedUploadData,
  };
}
