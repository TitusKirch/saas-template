<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

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
  type Form = AuthResetPasswordForm;
  const form: Ref<Form> = ref({
    email: email,
    token: token,
    password: '',
    password_confirm: '',
  });
  const errorMessages: Ref<Record<string, string>> = ref({});
  const { passwordToggle } = useFormKit();

  // submit handling
  const { transformResetPasswordFormToData, resetPassword } = useAuth();
  const resetData: Ref<AuthResetPasswordData | undefined> = ref();
  const { error, status, execute } = await resetPassword({
    data: resetData,
  });
  const submit = async (data: Form, node: FormKitNode) => {
    resetData.value = transformResetPasswordFormToData({
      form: form.value,
    });
    await execute();
    errorMessages.value = {};
    if (error.value?.data?.errors) {
      for (const key in error.value.data.errors) {
        errorMessages.value[key] = error.value.data.errors[key][0];
      }
      node.setErrors([], errorMessages.value);
      return false;
    } else if (error.value?.data?.message) {
      errorMessages.value = {
        form: error.value.data.message,
      };
      return false;
    }

    return navigateToLocale({
      name: 'auth-password-reset-success',
    });
  };

  // error handling
  watch(form, (newValue: Form, oldValue: Form) => {
    for (const key of Object.keys(newValue) as Array<keyof Form>) {
      if (newValue[key] !== oldValue[key]) {
        // TODO: Refactor to doesn't use dynamic delete
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete errorMessages.value[key];
      }
    }
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
        name="password_confirm"
        :label="$t('global.password_confirm.label')"
        validation="required|confirm"
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
