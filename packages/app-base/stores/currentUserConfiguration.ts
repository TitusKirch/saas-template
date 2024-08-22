// import { watchArray } from '@vueuse/core';

export const useCurrentUserConfigurationStore = defineStore('currentUserConfiguration', () => {
  // general
  const userConfigurationsAreSyncedWithRemote = ref(false);
  const setUserConfigurationsAreSyncedWithRemoteByUserConfigurations = () => {
    if (!userConfigurations.value) {
      userConfigurationsAreSyncedWithRemote.value = true;
    } else {
      userConfigurationsAreSyncedWithRemote.value = false;
    }

    console.info('setUserConfigurationsAreSyncedWithRemoteByUserConfigurations');
    console.info(
      'userConfigurationsAreSyncedWithRemote.value',
      userConfigurationsAreSyncedWithRemote.value
    );
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
    console.info('setUserConfigurations');
    setUserConfigurationsAreSyncedWithRemoteByUserConfigurations();
    console.info(
      'userConfigurationsAreSyncedWithRemote.value',
      userConfigurationsAreSyncedWithRemote.value
    );

    userConfigurations.value = configurations;
  };
  const setUserConfiguration = ({ configuration }: { configuration: UserConfigurationVariant }) => {
    console.info('setUserConfiguration');
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
    console.info('removeUserConfigurationById');
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
    console.info('removeUserConfigurationByContextAndKey');
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
    console.info('removeUserConfiguration');
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
      title: 'Syncing user configurations...',
    });
  };
  const syncUserConfigurationsTimeout = ref<NodeJS.Timeout | undefined>();
  watch(
    userConfigurations,
    async () => {
      console.info('============================================');
      console.info(
        'userConfigurationsAreSyncedWithRemote.value',
        userConfigurationsAreSyncedWithRemote.value
      );

      if (userConfigurationsAreSyncedWithRemote.value) {
        console.info('userConfigurationsAreSyncedWithRemote.value is true');
        return;
      }

      if (syncUserConfigurationsTimeout.value) {
        console.info('clearTimeout(syncUserConfigurationsTimeout.value);');
        clearTimeout(syncUserConfigurationsTimeout.value);
        syncUserConfigurationsTimeout.value = undefined;
      }

      console.info('setTimeout(syncUserConfigurations, 3000);');
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
