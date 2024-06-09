<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

  // form setup
  type Form = AuthForgotPasswordForm;
  const form: Ref<Form> = ref({
    email: '',
  });
  const errorMessages: Ref<Record<string, string>> = ref({});

  // submit handling
  const { forgotPassword } = useAuth();
  const { error, status, execute } = await forgotPassword({
    data: form,
  });
  const submit = async (data: Form, node: FormKitNode) => {
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

    if (status.value === 'success') {
      return navigateToLocale({
        name: 'auth-password-forgot-success',
      });
    }
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

      <FormKit
        type="email"
        name="email"
        :label="$t('global.email.label')"
        validation="required|email"
        :placeholder="usePlaceholder({ type: 'email' })"
        prefix-icon="email"
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
