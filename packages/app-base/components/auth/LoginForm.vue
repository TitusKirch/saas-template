<script setup lang="ts">
  import type { FormKitMessage } from '@formkit/core';
  import type { FormKitNode } from '@formkit/core';
  import { getValidationMessages } from '@formkit/validation';

  // form setup
  type Form = AuthLoginForm;
  const form: Ref<Form> = ref({
    email: 'test@example.com',
    password: 'test@example.com',
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

      navigateToLocale({
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
  <div>
    <div class="space-y-6">
      <div class="text-center">
        <div class="mb-2 pointer-events-none">
          <UIcon name="i-fa6-solid-fire" class="w-8 h-8 flex-shrink-0 text-primary-500" />
        </div>

        <p class="text-2xl text-gray-900 dark:text-white font-bold">
          {{ $t('base.auth.loginForm.title') }}
        </p>

        <i18n-t
          keypath="base.auth.loginForm.description"
          tag="p"
          class="text-gray-500 dark:text-gray-400 mt-1"
        >
          <NuxtLinkLocale
            :to="{
              name: 'register',
            }"
            class="text-primary-500 font-medium"
            >{{ $t('base.auth.loginForm.action.register.title') }}</NuxtLinkLocale
          >
        </i18n-t>
      </div>

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
          :label="$t('base.auth.loginForm.email.label')"
          validation="required|email"
        />
        <FormKit
          type="password"
          name="password"
          :label="$t('base.auth.loginForm.password.label')"
          validation="required"
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
          >{{ $t('base.auth.loginForm.submit.label') }}</UButton
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
  </div>
</template>
