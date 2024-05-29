export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const userLoaded = ref(false);

  const fetchUser = async () => {
    if (userLoaded.value) {
      return;
    }
    userLoaded.value = true;
    const { get } = useApi();
    const { transformUserData } = useUser();
    const { data } = await get<UserData, UserResponse>('users/me', {
      version: 'v1',
    });
    if (!data.value?.data) {
      return;
    }
    user.value = transformUserData({ data: data.value.data });
  };
  const setUser = ({ user: newUser }: { user: User }) => {
    user.value = newUser;
  };
  const setUserData = ({ data }: { data: UserData }) => {
    const { transformUserData } = useUser();
    user.value = transformUserData({ data });
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
