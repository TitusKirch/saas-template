export const useCurrentUserStore = defineStore('currentUser', () => {
  // current user
  const currentUser = ref<UserMe | undefined>();
  const isAuthenticated = computed(() => {
    return !!currentUser.value;
  });
  const emailIsVerified = computed(() => {
    return currentUser.value?.email_verified_at !== null;
  });
  const hasPassword = computed(() => {
    return currentUser.value?.has_password ?? false;
  });
  const setCurrentUser = ({ user: newUser }: { user: UserMe }) => {
    currentUser.value = newUser;
  };

  // current user avatar url
  const currentUserAvatarUrl = ref<string | undefined>();
  const currentUserAvatarPresignedUploadUrlData = ref<
    UserMeAvatarPresignedUploadData | undefined
  >();
  const setCurrentUserAvatarUrl = ({ avatarUrl }: { avatarUrl: string }) => {
    currentUserAvatarUrl.value = avatarUrl;
  };

  const reset = () => {
    currentUser.value = undefined;
    currentUserAvatarUrl.value = undefined;
  };

  return {
    currentUser,
    currentUserAvatarUrl,
    currentUserAvatarPresignedUploadUrlData,
    emailIsVerified,
    hasPassword,
    isAuthenticated,
    reset,
    setCurrentUser,
    setCurrentUserAvatarUrl,
  };
});
