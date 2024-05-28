import { useUserStore } from '@tituskirch/app-base/stores/user';

export default function () {
  // me
  const me = async () => {
    const userStore = useUserStore();

    if (!userStore.user) {
      await userStore.fetchUser();
    }

    return userStore.user;
  };
  const reset = () => {
    const userStore = useUserStore();
    userStore.resetUser();
  };

  // transformers
  const transformUserData = ({ data }: { data: UserData }): User => {
    return {
      ...data,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  };

  return {
    me,
    reset,
    transformUserData,
  };
}
