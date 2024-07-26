export const useCurrentUserStore = defineStore('currentUser', () => {
  // user
  const user = ref<UserMe | undefined>();

  const {
    data: fetchUserData,
    status: fetchUserStatus,
    execute: fetchUserExecute,
    error: fetchUserError,
  } = useApiFetch<UserMeData, UserMeResponse>('users/me', {
    immediate: false,
    watch: false,
  });

  watch(fetchUserData, (newData) => {
    if (!newData?.data) {
      return;
    }
    user.value = newData.data;
  });

  const fetchUser2 = async () => {
    await fetchUserExecute();
  };

  const userIsLoaded = ref(false);
  const isAuthenticated = computed(() => {
    return !!user.value;
  });
  const emailIsVerified = computed(() => {
    return user.value?.email_verified_at !== null;
  });
  const hasPassword = computed(() => {
    return user.value?.has_password ?? false;
  });

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
  const updateUser = async ({ data }: { data: Ref<UpdateUserMeData> }) => {
    const { data: response } = await useApiFetch<UpdateUserMeData, UpdateUserMeResponse>(
      'auth/user/profile-information',
      {
        method: 'PUT',
        body: data,
      }
    );

    if (!response.value?.data) {
      return;
    }

    await refetchUser();
  };
  const refetchUser = async () => {
    await fetchUser({ force: true });
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
    emailIsVerified,
    fetchAvatar,
    fetchUser,
    hasPassword,
    isAuthenticated,
    refetchUser,
    reset,
    setUser,
    updateUser,
    user,
    userIsLoaded,

    fetchUser2,
    fetchUserData,
    fetchUserError,
    fetchUserStatus,
  };
});
