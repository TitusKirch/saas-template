import { useCurrentUserConfigurationStore } from '@tituskirch/app-base/stores/currentUserConfiguration';

export default function () {
  const currentUserConfigurationStore = useCurrentUserConfigurationStore();
  const currentUserConfigurationStoreRefs = storeToRefs(currentUserConfigurationStore);

  // current user configurations
  const { getCurrentUserConfigurations } = useApiUsersMe();
  const {
    data: fetchCurrentUserConfigurationsData,
    error: fetchCurrentUserConfigurationsError,
    execute: fetchCurrentUserConfigurations,
    status: fetchCurrentUserConfigurationsStatus,
  } = getCurrentUserConfigurations({
    options: {
      immediate: false,
      watch: false,
      lazy: true,
    },
  });
  watch(
    () => fetchCurrentUserConfigurationsData.value,
    (newData) => {
      if (!newData?.data) {
        return;
      }
      currentUserConfigurationStore.setUserConfigurations({
        configurations: newData.data,
      });
    }
  );
  const { currentUser } = useCurrentUser();
  watch(
    () => currentUser.value,
    async (newUser) => {
      if (!newUser) {
        return;
      }
      await fetchCurrentUserConfigurations();
    }
  );
  if (currentUser.value && !currentUserConfigurationStoreRefs.userConfigurations.value) {
    fetchCurrentUserConfigurations();
  }

  return {
    ...currentUserConfigurationStore,
    ...currentUserConfigurationStoreRefs,
    fetchCurrentUserConfigurations,
    fetchCurrentUserConfigurationsData,
    fetchCurrentUserConfigurationsError,
    fetchCurrentUserConfigurationsStatus,
  };
}
