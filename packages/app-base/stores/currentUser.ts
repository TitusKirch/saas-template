export const useCurrentUserStore = defineStore('currentUser', () => {
  // user
  const user = ref<UserMe | undefined>();
  const userIsLoaded = ref(false);
  const fetchUser = async ({
    force = false,
  }: {
    force?: boolean;
  } = {}) => {
    if (userIsLoaded.value && !force) {
      return;
    }
    userIsLoaded.value = true;

    const { data } = await useApiFetch<UserMeData, UserMeResponse>('users/me');
    if (!data.value?.data) {
      return;
    }
    user.value = data.value.data;
  };
  const setUser = ({ user: newUser }: { user: UserMe }) => {
    user.value = newUser;
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
    user.value = undefined;
    userIsLoaded.value = false;
    avatar.value = undefined;
  };

  return {
    avatar,
    avatarIsLoaded,
    fetchAvatar,
    fetchUser,
    reset,
    setUser,
    user,
    userIsLoaded,
  };
});
