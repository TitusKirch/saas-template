<script setup lang="ts">
  // form setup
  const form: Ref<AuthForgotPasswordData> = ref({
    email: '',
  });
  const { forgotPassword } = useAuth();
  const { error, status, execute } = await forgotPassword({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthForgotPasswordData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      return navigateToLocale({
        name: 'auth-password-forgot-success',
      });
    },
  });
</script>
<template>
  <div class="space-y-6">
    <FormKit
      v-slot="{ state: { valid } }"
      v-model="form"
      type="form"
      :actions="false"
      :disabled="status === 'success'"
      @submit="submit"
    >
      <FormErrorsAlert :error-messages="errorMessages" />

      <FormKit
        type="email"
        name="email"
        :label="$t('global.email.label')"
        validation="required|email"
        :placeholder="usePlaceholder({ type: 'email' })"
        prefix-icon="email"
        autocomplete="username"
      />

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(errorMessages).length || status === 'success'"
        :loading="status === 'pending'"
        icon="i-fa6-solid-paper-plane"
        :ui="{
          base: 'mt-8',
        }"
        >{{ $t('global.action.auth.passwordResetLinkRequest.label') }}</UButton
      >
    </FormKit>
  </div>
</template>
