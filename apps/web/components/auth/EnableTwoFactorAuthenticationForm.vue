<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

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
  type Form = AuthUserConfirmedTwoFactorAuthenticationData;
  const form: Ref<Form> = ref({
    code: '',
  });
  const formErrorMessages: Ref<Record<string, string> | false> = ref({});
  const { setErrors } = useFormKit();

  const { confirmedTwoFactorAuthentication } = useAuth();
  const { refetchMe } = useUser();
  const {
    status: confirmedTwoFactorAuthenticationStatus,
    execute: confirmedTwoFactorAuthenticationExecute,
    error: confirmedTwoFactorAuthenticationError,
  } = await confirmedTwoFactorAuthentication({
    data: form,
  });
  const submitConfirmedTwoFactorAuthentication = async (data: Form, node: FormKitNode) => {
    await confirmedTwoFactorAuthenticationExecute();
    formErrorMessages.value = setErrors<AuthUserConfirmedTwoFactorAuthenticationData>({
      node,
      error: confirmedTwoFactorAuthenticationError.value?.data,
    });

    if (confirmedTwoFactorAuthenticationStatus.value === 'success') {
      emit('success');
      await refetchMe();
    }
  };

  // error handling for form
  watch(form, (newValue: Form, oldValue: Form) => {
    const updatedErrorMessages: typeof formErrorMessages.value = {};
    for (const key of Object.keys(newValue) as Array<keyof Form>) {
      if (
        newValue[key] === oldValue[key] &&
        formErrorMessages.value != false &&
        formErrorMessages.value[key]
      ) {
        6;
        updatedErrorMessages[key] = formErrorMessages.value[key];
      }
    }
    formErrorMessages.value = updatedErrorMessages;
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
    class="flex items-center justify-center w-full flex-col space-y-4 overflow-hidden"
  >
    <div
      class="inline-block rounded-lg p-2 bg-white -mx-2 text-black"
      v-html="twoFactorQrCodeData?.svg.replace('#2d3748', 'currentColor')"
    />

    <div class="text-sm text-gray-500 flex flex-col items-center gap-1">
      <div class="text-wrap">
        {{ $t('auth.enableTwoFactorAuthenticationForm.qrCode.description') }}
      </div>
      <div class="inline-flex items-center bg-gray-100 dark:bg-gray-950 rounded-lg px-2 py-1 gap-1">
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
      @submit="submitConfirmedTwoFactorAuthentication"
      :classes="{
        form: 'w-full',
      }"
    >
      <FormErrorsAlert v-if="formErrorMessages" :error-messages="formErrorMessages" />

      <FormKit
        type="otp"
        name="code"
        :label="$t('auth.enableTwoFactorAuthenticationForm.form.confirm.label')"
        validation="required"
      />

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(formErrorMessages).length"
        :loading="confirmedTwoFactorAuthenticationStatus === 'pending'"
        icon="i-fa6-solid-floppy-disk"
        >{{ $t('global.action.save.label') }}</UButton
      >
    </FormKit>
  </div>
</template>
