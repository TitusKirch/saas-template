<script setup lang="ts">
  import type { FormKitMessage } from '@formkit/core';
  import type { FormKitNode } from '@formkit/core';
  import { getValidationMessages } from '@formkit/validation';

  // form setup
  type Form = AuthLoginForm;
  const form: Ref<Form> = ref({
    email: '',
    password: '',
  });
  const errorMessages: Ref<Record<string, string>> = ref({});

  // submit handling
  const { login } = useAuth();
  const { error, status, execute } = await login({
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
      const { me } = useUser();
      await me();

      const { redirect } = useRoute()?.query;

      if (redirect) {
        return navigateToLocale(redirect as string);
      }

      return navigateToLocale({
        name: 'index',
      });
    }
  };

  // error handling
  watch(form, (newValue: Form, oldValue: Form) => {
    for (const key of Object.keys(newValue) as Array<keyof Form>) {
      if (newValue[key] !== oldValue[key]) {
        delete errorMessages.value[key];
      }
    }
  });

  // third party providers
  const { thirdPartyProviders } = useAuth();
  const providers = thirdPartyProviders();
</script>
<template>
  <div class="space-y-6">
    <FormKit
      type="form"
      v-model="form"
      :actions="false"
      @submit="submit"
      #default="{ state: { valid } }"
    >
      <FormErrorsAlert :error-messages="errorMessages" />

      <FormKit
        type="email"
        name="email"
        :label="$t('global.email.label')"
        validation="required|email"
        :placeholder="usePlaceholder({ type: 'email' })"
      />
      <FormKit
        type="password"
        name="password"
        :label="$t('global.password.label')"
        validation="required"
        :placeholder="usePlaceholder({ type: 'password' })"
      />

      <UButton
        type="submit"
        block
        :disabled="!valid || Object.keys(errorMessages).length"
        :loading="status === 'pending' || (status !== 'idle' && !error)"
        icon="i-fa6-solid-right-to-bracket"
        :ui="{
          base: 'mt-8',
        }"
        >{{ $t('global.action.login.label') }}</UButton
      >
    </FormKit>

    <UDivider :label="$t('global.or.label')" />

    <div v-if="providers?.length" class="space-y-3">
      <UButton
        v-for="(provider, index) in providers"
        :key="index"
        v-bind="provider"
        color="gray"
        block
        @click="provider.click"
      />
    </div>
  </div>
</template>
