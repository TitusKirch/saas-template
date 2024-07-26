export const useCurrentUserStore = defineStore('currentUser', () => {
  // user
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

  // avatar
  const avatar = ref<string | undefined>();
  const avatarIsLoaded = ref(false);
  const fetchAvatar = async ({
    force = false,
  }: {
    force?: boolean;
  } = {}) => {
    if (avatarIsLoaded.value && !force) {
      return;
    }
    avatarIsLoaded.value = true;

    const { data } = await useApiFetch<UserMeAvatarData, UserMeAvatarResponse>('users/me/avatar', {
      lazy: true,
    });
    if (!data.value?.data) {
      return;
    }
    avatar.value = data.value.data.presignedUrl;
  };

  const reset = () => {
    currentUser.value = undefined;
    avatar.value = undefined;
  };

  return {
    avatar,
    avatarIsLoaded,
    emailIsVerified,
    fetchAvatar,
    hasPassword,
    isAuthenticated,
    reset,
    setCurrentUser,
    currentUser,
  };
});
