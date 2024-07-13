<script setup lang="ts">
  // form setup
  const turnstile = ref();
  const turnstileToken = ref('');
  const form = ref<AuthForgotPasswordData>({
    email: '',
    'cf-turnstile-response': '',
  });
  const { forgotPassword } = useAuth();
  const { error, status, execute } = await forgotPassword({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthForgotPasswordData>({
    form,
    error,
    status,
    beforeExecuteCallback: async () => {
      form.value['cf-turnstile-response'] = turnstileToken.value;
    },
    executeCallback: execute,
    successCallback: async () => {
      return navigateToLocale({
        name: 'auth-password-forgot-success',
      });
    },
    errorCallback: async () => {
      turnstile.value?.reset();
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

      <FormTurnstileContainer :first-show-on="valid">
        <NuxtTurnstile
          ref="turnstile"
          v-model="turnstileToken"
          :options="{
            action: 'forgot-password',
          }"
        />
      </FormTurnstileContainer>

      <UButton
        type="submit"
        block
        :disabled="
          !valid || !!Object.keys(errorMessages).length || status === 'success' || !turnstileToken
        "
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
