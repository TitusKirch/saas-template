<script setup lang="ts">
  const emit = defineEmits<{
    success: [];
  }>();

  // get two factor qr code
  const { enableTwoFactorAuthentication, twoFactorQrCode } = useAuth();

  const {
    status: enableTwoFactorAuthenticationStatus,
    execute: enableTwoFactorAuthenticationExecute,
  } = await enableTwoFactorAuthentication();
  const enableTwoFactorAuthenticationClick = async () => {
    await enableTwoFactorAuthenticationExecute();
  };
  const {
    data: twoFactorQrCodeData,
    status: twoFactorQrCodeStatus,
    execute: twoFactorQrCodeExecute,
  } = await twoFactorQrCode();
  watch(
    () => enableTwoFactorAuthenticationStatus.value,
    async (status) => {
      if (status === 'success') {
        await twoFactorQrCodeExecute();
      }
    }
  );
  const twoFactorQrCodeSecret = computed(() => {
    return twoFactorQrCodeData.value?.url?.split('?secret=')[1]?.split('&')[0];
  });

  // form setup
  const form = ref<AuthUserConfirmedTwoFactorAuthenticationData>({
    code: '',
  });
  const { confirmedTwoFactorAuthentication } = useAuth();
  const { refetchCurrentUser } = useCurrentUser();
  const {
    status: confirmedTwoFactorAuthenticationStatus,
    execute: confirmedTwoFactorAuthenticationExecute,
    error: confirmedTwoFactorAuthenticationError,
  } = await confirmedTwoFactorAuthentication({
    data: form,
  });
  const { submit: submitConfirmedTwoFactorAuthentication, errorMessages } =
    useFormKitForm<AuthUserConfirmedTwoFactorAuthenticationData>({
      form,
      error: confirmedTwoFactorAuthenticationError,
      status: confirmedTwoFactorAuthenticationStatus,
      executeCallback: confirmedTwoFactorAuthenticationExecute,
      successCallback: async () => {
        emit('success');
        await refetchCurrentUser();
      },
    });
</script>

<template>
  <AuthNeedsToConfirmUserPasswordButton
    v-if="!twoFactorQrCodeData?.svg"
    :confirm-password-button-title="
      $t('auth.enableTwoFactorAuthenticationForm.action.confirmPasswordAndEnable.label')
    "
    :confirm-password-button-props="{ block: true }"
    :confirm-password-button-callback="enableTwoFactorAuthenticationClick"
  >
    <UButton
      block
      icon="i-fa6-solid-lock"
      :loading="
        enableTwoFactorAuthenticationStatus === 'pending' || twoFactorQrCodeStatus === 'pending'
      "
      :disabled="twoFactorQrCodeData?.svg"
      @click="enableTwoFactorAuthenticationClick"
    >
      {{ $t('auth.enableTwoFactorAuthenticationForm.action.enable.label') }}
    </UButton>
  </AuthNeedsToConfirmUserPasswordButton>

  <div
    v-if="twoFactorQrCodeData?.svg"
    class="flex w-full flex-col items-center justify-center space-y-4 overflow-hidden"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="-mx-2 inline-block rounded-lg bg-white p-2 text-black"
      v-html="twoFactorQrCodeData?.svg.replace('#2d3748', 'currentColor')"
    />
    <!-- eslint-enable vue/no-v-html -->

    <div class="flex flex-col items-center gap-1 text-sm text-gray-500">
      <div class="text-wrap">
        {{ $t('auth.enableTwoFactorAuthenticationForm.qrCode.description') }}
      </div>
      <div class="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-950">
        <code>{{ twoFactorQrCodeSecret }}</code>
        <CopyButton
          v-if="twoFactorQrCodeSecret"
          :value="twoFactorQrCodeSecret"
          color="gray"
          class="p-0"
        />
      </div>
    </div>

    <FormKit
      v-slot="{ state: { valid } }"
      v-model="form"
      type="form"
      :actions="false"
      :disabled="confirmedTwoFactorAuthenticationStatus === 'success'"
      :classes="{
        form: 'w-full',
      }"
      @submit="submitConfirmedTwoFactorAuthentication"
    >
      <FormErrorsAlert v-if="errorMessages" :error-messages="errorMessages" />

      <FormKit
        type="otp"
        name="code"
        :label="$t('auth.enableTwoFactorAuthenticationForm.form.confirm.label')"
        validation="required"
      />

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(errorMessages).length"
        :loading="confirmedTwoFactorAuthenticationStatus === 'pending'"
        icon="i-fa6-solid-floppy-disk"
      >
        {{ $t('global.action.save.label') }}
      </UButton>
    </FormKit>
  </div>
</template>
