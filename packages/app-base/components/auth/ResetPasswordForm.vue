<script setup lang="ts">
  import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
  const currentUserStore = useCurrentUserStore();

  // get data from route
  const route = useRoute();
  const email = route.query.email as string;
  const token = route.query.token as string;
  if (!email || !token) {
    throw createError({
      statusCode: 404,
    });
  }

  // form setup
  const turnstile = ref();
  const turnstileToken = ref('');
  const form = ref<AuthResetPasswordData>({
    email: email,
    token: token,
    password: '',
    password_confirmation: '',
    'cf-turnstile-response': '',
  });
  const { passwordToggle } = useFormKit();
  const { resetPassword } = useAuth();
  const { error, status, execute } = await resetPassword({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthResetPasswordData>({
    form,
    error,
    status,
    beforeExecuteCallback: async () => {
      form.value['cf-turnstile-response'] = turnstileToken.value;
    },
    executeCallback: execute,
    successCallback: async () => {
      return await currentUserStore.fetchUser().finally(() => {
        return navigateToLocale({
          name: 'auth-password-reset-success',
        });
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

      <FormKit type="hidden" name="email" validation="required|email" />
      <FormKit type="hidden" name="token" />
      <FormKit
        type="password"
        name="password"
        :label="$t('global.password.label')"
        validation="required"
        :placeholder="usePlaceholder({ type: 'password' })"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="passwordToggle"
      />
      <FormKit
        type="password"
        name="password_confirmation"
        :label="$t('global.password_confirmation.label')"
        validation="required|confirm:password"
        :placeholder="usePlaceholder({ type: 'password' })"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="passwordToggle"
      />

      <FormTurnstileContainer :first-show-on="valid">
        <NuxtTurnstile
          ref="turnstile"
          v-model="turnstileToken"
          :options="{
            action: 'reset-password',
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
        >{{ $t('global.action.auth.resetPassword.label') }}</UButton
      >
    </FormKit>
  </div>
</template>
