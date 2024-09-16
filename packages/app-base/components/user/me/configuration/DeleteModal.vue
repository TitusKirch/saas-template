<script setup lang="ts">
  const props = defineProps<{
    userConfiguration?: UserConfiguration;
  }>();
  const model = defineModel<boolean>();
  const emits = defineEmits<{
    close: [];
    delete: [];
  }>();

  const { removeUserConfiguration, syncUserConfigurationsNotification } =
    useCurrentUserConfigurations();
  const { deleteCurrentUserConfiguration } = useApiUsersMe();

  const isLoaded = ref(false);
  const preventCloseEmit = ref(false);
  const clickDeleteHandler = async () => {
    if (!props.userConfiguration || isLoaded.value) {
      return;
    }

    isLoaded.value = true;
    preventCloseEmit.value = true;
    await deleteCurrentUserConfiguration({
      id: props.userConfiguration.id,
    });
    model.value = false;
    removeUserConfiguration({
      forceIsSyncedWithRemote: true,
      configuration: props.userConfiguration,
    });
    syncUserConfigurationsNotification();
    emits('delete');
    preventCloseEmit.value = false;
    isLoaded.value = false;
  };
  const close = () => {
    emits('close');
    model.value = false;
  };
  watch(
    model,
    (value) => {
      if (preventCloseEmit.value || value) {
        return;
      }
      close();
    },
    { immediate: true }
  );
</script>

<template>
  <BaseModal
    v-if="userConfiguration"
    v-model="model"
    :title="$t('user.me.configuration.deleteModal.title')"
    type="error"
  >
    <template #description>
      <i18n-t keypath="user.me.configuration.deleteModal.description" tag="p">
        <strong>{{ userConfiguration.key }}</strong>
      </i18n-t>
    </template>
    <BaseButtonContainer>
      <UButton
        color="red"
        :label="$t('action.delete.label')"
        icon="fa6-solid-trash-can"
        :loading="isLoaded"
        @click="clickDeleteHandler"
      />
      <UButton color="white" :label="$t('action.close.label')" @click="model = false" />
    </BaseButtonContainer>
  </BaseModal>
</template>
