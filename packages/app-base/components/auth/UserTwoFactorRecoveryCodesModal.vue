<script setup lang="ts">
  withDefaults(
    defineProps<{
      forceToDownload?: boolean;
    }>(),
    {
      forceToDownload: false,
    }
  );
  const model = defineModel<boolean>();

  // get two factor recovery codes
  const { twoFactorRecoveryCodes } = useApiAuth();
  const { data, execute, status } = await twoFactorRecoveryCodes({
    options: {
      immediate: false,
      watch: false,
    },
  });

  // check if modal is open
  watch(
    () => model.value,
    async () => {
      if (model.value) {
        await execute();
      }
    }
  );

  // download recovery codes
  const hasDownloaded = ref(false);
  const hasDownloadedTimeout = ref<NodeJS.Timeout | undefined>();
  const downloadRecoveryCodes = () => {
    if (!data.value) {
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([data.value.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'recovery-codes.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    hasDownloadedTimeout.value = setTimeout(() => {
      hasDownloaded.value = true;
    }, 1000);
  };
  onBeforeUnmount(() => {
    if (hasDownloadedTimeout.value) {
      clearTimeout(hasDownloadedTimeout.value);
    }
  });
</script>
<template>
  <BaseModal
    v-model="model"
    :title="$t('auth.userTwoFactorRecoveryCodesModal.title')"
    :description="$t('auth.userTwoFactorRecoveryCodesModal.description')"
    type="warning"
    :prevent-close="forceToDownload && !hasDownloaded"
    :close-button="{
      disabled: forceToDownload && !hasDownloaded,
    }"
  >
    <BaseAlert
      v-if="(!data && status === 'idle') || status === 'pending'"
      type="info"
      :title="$t('auth.userTwoFactorRecoveryCodesModal.alert.loading.title')"
    />
    <ul v-else class="grid grid-cols-2 gap-2">
      <li
        v-for="code in data"
        :key="code"
        class="rounded-lg bg-gray-100 px-2 py-1 text-center dark:bg-gray-950"
      >
        <code>{{ code }}</code>
      </li>
    </ul>

    <BaseButtonContainer class="mt-8">
      <UButton
        color="orange"
        :label="$t('auth.userTwoFactorRecoveryCodesModal.action.download.label')"
        icon="fa6-solid-download"
        :loading="false"
        :disabled="!data"
        @click="downloadRecoveryCodes"
      />
      <UButton
        color="white"
        :label="$t('global.action.close.label')"
        :disabled="forceToDownload && !hasDownloaded"
        @click="model = false"
      />
    </BaseButtonContainer>
  </BaseModal>
</template>
