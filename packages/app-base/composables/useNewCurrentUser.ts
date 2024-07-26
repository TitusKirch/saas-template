import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

export default function () {
  const currentUserStore = useCurrentUserStore();
  const currentUserStoreRefs = storeToRefs(currentUserStore);
  const { getCurrentUser } = useApiCurrentUsers();

  const {
    data: fetchUserData,
    status: fetchUserStatus,
    execute: fetchCurrentUser,
    error: fetchUserError,
  } = getCurrentUser({
    options: {
      immediate: false,
      watch: false,
    },
  });

  watch(fetchUserData, (newData) => {
    if (!newData?.data) {
      return;
    }
    currentUserStore.setCurrentUser({ user: newData.data });
  });

  return {
    ...currentUserStore,
    ...currentUserStoreRefs,
    fetchCurrentUser,
    fetchUserStatus,
    fetchUserError,
  };
}
