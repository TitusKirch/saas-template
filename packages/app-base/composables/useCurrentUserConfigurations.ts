import { useCurrentUserConfigurationStore } from '@tituskirch/app-base/stores/currentUserConfiguration';

export default function () {
  const currentUserConfigurationStore = useCurrentUserConfigurationStore();
  const currentUserConfigurationStoreRefs = storeToRefs(currentUserConfigurationStore);

  // current user configurations
  const { getCurrentUserConfigurations } = useApiUsersMe();
  const {
    data: fetchCurrentUserConfigurationsData,
    status: fetchCurrentUserConfigurationsStatus,
    execute: fetchCurrentUserConfigurations,
    error: fetchCurrentUserError,
  } = getCurrentUserConfigurations({
    options: {
      immediate: false,
      watch: false,
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

  return {
    ...currentUserConfigurationStore,
    ...currentUserConfigurationStoreRefs,
    fetchCurrentUserConfigurations,
    fetchCurrentUserConfigurationsStatus,
    fetchCurrentUserError,
    fetchCurrentUserConfigurationsData,
  };
}
