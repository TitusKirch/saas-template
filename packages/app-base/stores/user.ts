export const useUserStore = defineStore('user', () => {
  const user = ref<UsersMe | null>(null);
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
    const { transformUsersMeData } = useUser();
    const { data } = await get<UsersMeData, UsersMeResponse>('users/me', {
      version: 'v1',
    });
    if (!data.value?.data) {
      return;
    }
    user.value = transformUsersMeData({ data: data.value.data });
  };
  const setUser = ({ user: newUsersMe }: { user: UsersMe }) => {
    user.value = newUsersMe;
  };
  const setUsersData = ({ data }: { data: UsersMeData }) => {
    const { transformUsersMeData } = useUser();
    user.value = transformUsersMeData({ data });
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
    setUsersData,
    resetUser,
  };
});
