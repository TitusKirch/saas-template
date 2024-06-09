export const useUserStore = defineStore('user', () => {
  const user = ref<UserMe | null>(null);
  const userLoaded = ref(false);

  const fetchUser = async ({
    force = false,
  }: {
    force?: boolean;
  } = {}) => {
    if (userLoaded.value && !force) {
      return;
    }
    userLoaded.value = true;
    const { get } = useApi();
    const { transformUserMeData } = useUser();
    const { data } = await get<UserMeData, UserMeResponse>('users/me', {
      version: 'v1',
    });
    if (!data.value?.data) {
      return;
    }
    user.value = transformUserMeData({ data: data.value.data });
  };
  const setUser = ({ user: newUserMe }: { user: UserMe }) => {
    user.value = newUserMe;
  };
  const setUserData = ({ data }: { data: UserMeData }) => {
    const { transformUserMeData } = useUser();
    user.value = transformUserMeData({ data });
  };
  const resetUser = () => {
    user.value = null;
    userLoaded.value = false;
  };

  return {
    user,
    userLoaded,
    fetchUser,
    setUser,
    setUserData,
    resetUser,
  };
});
