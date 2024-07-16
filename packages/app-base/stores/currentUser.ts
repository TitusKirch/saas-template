export const useCurrentUserStore = defineStore('currentUser', () => {
  const user = ref<UserMe | undefined>();
  const isLoaded = ref(false);

  const fetchUser = async ({
    force = false,
  }: {
    force?: boolean;
  } = {}) => {
    if (isLoaded.value && !force) {
      return;
    }
    isLoaded.value = true;

    const { get } = useApi();
    const { data } = await get<UserMeData, UserMeResponse>('users/me');
    if (!data.value?.data) {
      return;
    }
    user.value = data.value.data;
  };

  const setUser = ({ user: newUser }: { user: UserMe }) => {
    user.value = newUser;
  };

  const reset = () => {
    user.value = undefined;
    isLoaded.value = false;
  };

  return {
    user,
    isLoaded,
    fetchUser,
    setUser,
    reset,
  };
});
