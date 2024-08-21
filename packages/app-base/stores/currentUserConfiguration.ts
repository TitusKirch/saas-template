export const useCurrentUserConfigurationStore = defineStore('currentUserConfiguration', () => {
  // user configurations
  const userConfigurations = ref<UserConfigurationVariant[] | undefined>();
  const setUserConfigurations = ({
    configurations,
  }: {
    configurations: UserConfigurationVariant[];
  }) => {
    userConfigurations.value = configurations;
  };

  const addUserConfiguration = ({ configuration }: { configuration: UserConfigurationVariant }) => {
    (userConfigurations.value ??= []).push(configuration);

    // userConfigurations.value = [...userConfigurations.value, configuration];
  };
  const removeUserConfigurationById = ({ id }: { id: BigInt }) => {
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
    userConfigurations.value = userConfigurations.value?.filter(
      (configuration) => configuration.context !== context || configuration.key !== key
    );
  };
  const removeUserConfiguration = (
    params:
      | {
          id: BigInt;
        }
      | {
          context: UserConfigurationContext;
          key: string;
        }
  ) => {
    if ('id' in params) {
      removeUserConfigurationById(params);
    } else {
      removeUserConfigurationByContextAndKey(params);
    }
  };
  const replaceUserConfiguration = ({
    configuration,
  }: {
    configuration: UserConfigurationVariant;
  }) => {
    if (!userConfigurations.value) {
      console.warn('userConfigurations.value is not defined');
      return;
    }

    const index = userConfigurations.value.findIndex(
      (config) => config.context === configuration.context && config.key === configuration.key
    );
    if (index === -1) {
      console.warn(
        `Could not find configuration with context "${configuration.context}" and key "${configuration.key}"`
      );
      return;
    }
    userConfigurations.value[index] = configuration;
  };
  const replaceOrAddUserConfiguration = ({
    configuration,
  }: {
    configuration: UserConfigurationVariant;
  }) => {
    const index = (userConfigurations.value ??= []).findIndex(
      (config) => config.context === configuration.context && config.key === configuration.key
    );
    if (index === -1) {
      userConfigurations.value.push(configuration);
    } else {
      userConfigurations.value[index] = configuration;
    }
  };
  const userConfigurationMappedByContextAndKey = computed(() => {
    const result: Record<string, Record<string, UserConfigurationVariant>> = {};

    if (!userConfigurations.value) {
      return {};
    }

    userConfigurations.value.forEach((configuration) => {
      if (!result[configuration.context]) {
        result[configuration.context] = {};
      }
      result[configuration.context][configuration.key] = configuration;
    });

    return result;
  });

  // sync
  const { setCurrentUserConfigurations } = useApiUsersMe();
  const { execute: setCurrentUserConfigurationsExecute } = setCurrentUserConfigurations({
    data: userConfigurations,
    options: {
      immediate: false,
      watch: false,
    },
  });
  const syncUserConfigurationsTimeout = ref<NodeJS.Timeout | undefined>();
  const syncUserConfigurations = async () => {
    console.info('syncUserConfigurations');

    await setCurrentUserConfigurationsExecute();
    useNotification({
      type: 'info',
      title: 'Syncing user configurations...',
    });
  };
  watch(
    () => userConfigurations.value,
    async (newValue, oldValue) => {
      if (!import.meta.client) {
        console.info('import.meta.client is false');
        return;
      }
      console.info('userConfigurations changed', oldValue, newValue);
      if (typeof oldValue === 'undefined') {
        console.info('oldValue is undefined');
        return;
      }
      if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
        console.info('oldValue is equal to newValue');
        return;
      }
      if (syncUserConfigurationsTimeout.value) {
        console.info('clearTimeout(syncUserConfigurationsTimeout.value);');
        clearTimeout(syncUserConfigurationsTimeout.value);
        syncUserConfigurationsTimeout.value = undefined;
      }
      if (!userConfigurations.value?.length) {
        console.info('userConfigurations.value is not defined');
        return;
      }
      console.info('setTimeout(syncUserConfigurations, 3000);');
      syncUserConfigurationsTimeout.value = setTimeout(async () => {
        await syncUserConfigurations();
      }, 3000);
    },
    { deep: true }
  );

  // general
  const reset = () => {
    userConfigurations.value = [];
  };

  return {
    addUserConfiguration,
    removeUserConfiguration,
    removeUserConfigurationById,
    removeUserConfigurationByContextAndKey,
    replaceUserConfiguration,
    replaceOrAddUserConfiguration,
    reset,
    setUserConfigurations,
    userConfigurationMappedByContextAndKey,
    userConfigurations,
  };
});
