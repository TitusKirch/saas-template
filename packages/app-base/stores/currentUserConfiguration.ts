export const useCurrentUserConfigurationStore = defineStore('currentUserConfiguration', () => {
  // general
  const userConfigurationsAreSyncedWithRemote = ref(false);
  const setUserConfigurationsAreSyncedWithRemoteByUserConfigurations = () => {
    if (!userConfigurations.value) {
      userConfigurationsAreSyncedWithRemote.value = true;
    } else {
      userConfigurationsAreSyncedWithRemote.value = false;
    }
  };

  // user configurations
  const userConfigurations = ref<UserConfigurationVariant[] | undefined>();
  const userConfigurationMappedByContextAndKey = computed<
    Record<string, Record<string, UserConfigurationVariant>> | undefined
  >(() => {
    if (!userConfigurations.value) {
      return undefined;
    }

    const result: Record<string, Record<string, UserConfigurationVariant>> = {};

    userConfigurations.value.forEach((configuration) => {
      if (!result[configuration.context]) {
        result[configuration.context] = {};
      }
      result[configuration.context][configuration.key] = configuration;
    });

    return result;
  });
  const setUserConfigurations = ({
    configurations,
  }: {
    configurations: UserConfigurationVariant[];
  }) => {
    setUserConfigurationsAreSyncedWithRemoteByUserConfigurations();

    userConfigurations.value = configurations;
  };
  const setUserConfiguration = ({ configuration }: { configuration: UserConfigurationVariant }) => {
    setUserConfigurationsAreSyncedWithRemoteByUserConfigurations();

    const index = userConfigurations.value?.findIndex(
      (config) => config.context == configuration.context && config.key == configuration.key
    );

    if (typeof index === 'number' && index !== -1 && userConfigurations.value) {
      userConfigurations.value[index] = configuration;
    } else {
      (userConfigurations.value ??= []).push(configuration);
    }
  };
  const removeUserConfigurationById = ({ id }: { id: BigInt }) => {
    setUserConfigurationsAreSyncedWithRemoteByUserConfigurations();

    userConfigurations.value = userConfigurations.value?.filter(
      (configuration): configuration is UserConfiguration =>
        'id' in configuration ? configuration.id !== id : true
    );
  };
  const removeUserConfigurationByContextAndKey = ({
    context,
    key,
  }: {
    context: UserConfigurationContext;
    key: string;
  }) => {
    setUserConfigurationsAreSyncedWithRemoteByUserConfigurations();

    userConfigurations.value = userConfigurations.value?.filter(
      (configuration) => configuration.context !== context || configuration.key !== key
    );
  };
  const removeUserConfiguration = ({
    configuration,
  }: {
    configuration: UserConfigurationVariant;
  }) => {
    if ('id' in configuration) {
      removeUserConfigurationById({ id: configuration.id });
    } else {
      removeUserConfigurationByContextAndKey({
        context: configuration.context,
        key: configuration.key,
      });
    }
  };

  // sync user configurations
  const { setCurrentUserConfigurations } = useApiUsersMe();
  const { execute: setCurrentUserConfigurationsExecute } = setCurrentUserConfigurations({
    data: userConfigurations,
    options: {
      immediate: false,
      watch: false,
    },
  });
  const syncUserConfigurations = async () => {
    await setCurrentUserConfigurationsExecute();
    userConfigurationsAreSyncedWithRemote.value = true;
    useNotification({
      type: 'info',
      description: 'Syncing user configurations...',
    });
  };
  const syncUserConfigurationsTimeout = ref<NodeJS.Timeout | undefined>();
  watch(
    userConfigurations,
    async () => {
      if (userConfigurationsAreSyncedWithRemote.value) {
        return;
      }

      if (syncUserConfigurationsTimeout.value) {
        clearTimeout(syncUserConfigurationsTimeout.value);
        syncUserConfigurationsTimeout.value = undefined;
      }

      syncUserConfigurationsTimeout.value = setTimeout(async () => {
        await syncUserConfigurations();
      }, 3000);
    },
    {
      deep: true,
    }
  );

  return {
    userConfigurations,
    setUserConfigurations,
    setUserConfiguration,
    removeUserConfiguration,
    removeUserConfigurationById,
    removeUserConfigurationByContextAndKey,
    userConfigurationMappedByContextAndKey,
  };
});
