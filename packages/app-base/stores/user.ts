export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  const fetchUser = async () => {
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

  const resetUser = () => {
    user.value = null;
  };

  return {
    user,
    fetchUser,
    resetUser,
  };
});
