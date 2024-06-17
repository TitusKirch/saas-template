<script setup lang="ts">
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
  const form: Ref<AuthResetPasswordData> = ref({
    email: email,
    token: token,
    password: '',
    password_confirmation: '',
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
    executeCallback: execute,
    successCallback: async () => {
      const { redirect } = useRoute().query;
      const { me } = useUser();
      return await me().finally(() => {
        if (redirect) {
          return navigateToLocale(redirect as string);
        }

        return navigateToLocale({
          name: 'auth-password-reset-success',
        });
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

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(errorMessages).length || status === 'success'"
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
