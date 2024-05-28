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
  const errorMessages: Ref<string[]> = ref([]);

  // submit handling
  const { login } = useAuth();
  const { data, error, status, execute } = await login({
    data: form,
  });
  const submit = async (data: Form, node: FormKitNode) => {
    await execute();
    if (error.value?.data?.errors) {
      const fieldSpecificErrors: Record<string, string> = {};
      for (const key in error.value.data.errors) {
        fieldSpecificErrors[key] = error.value.data.errors[key][0];
      }
      node.setErrors([], fieldSpecificErrors);
      errorMessages.value = Object.values(fieldSpecificErrors);
      return false;
    }
  };

  // error handling
  const showErrors = (node: FormKitNode) => {
    const validations = getValidationMessages(node);
    errorMessages.value = [];
    validations.forEach((inputMessages: FormKitMessage[]) => {
      errorMessages.value = errorMessages.value.concat(
        inputMessages.map((message: FormKitMessage) => message.value as string)
      );
    });
  };

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
        @submit-invalid="showErrors"
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
          :loading="status === 'pending'"
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
