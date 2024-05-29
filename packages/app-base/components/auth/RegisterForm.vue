<script setup lang="ts">
  import type { FormKitMessage } from '@formkit/core';
  import type { FormKitNode } from '@formkit/core';
  import { getValidationMessages } from '@formkit/validation';

  // form setup
  type Form = AuthRegisterForm;
  const form: Ref<Form> = ref({
    email: 'test@example.com',
    email_confirm: 'test@example.com',
    password: 'test@example.com',
    password_confirm: 'test@example.com',
  });
  const errorMessages: Ref<Record<string, string>> = ref({});

  // submit handling
  const { transformRegisterFormToData, register } = useAuth();
  const registerData: Ref<AuthRegisterData | undefined> = ref();
  const { error, status, execute } = await register({
    data: registerData,
  });
  const submit = async (data: Form, node: FormKitNode) => {
    registerData.value = transformRegisterFormToData({
      form: form.value,
    });
    await execute();
    if (error.value?.data?.errors) {
      errorMessages.value = {};
      for (const key in error.value.data.errors) {
        errorMessages.value[key] = error.value.data.errors[key][0];
      }
      node.setErrors([], errorMessages.value);
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
          {{ $t('base.auth.registerForm.title') }}
        </p>

        <i18n-t
          keypath="base.auth.registerForm.description"
          tag="p"
          class="text-gray-500 dark:text-gray-400 mt-1"
        >
          <NuxtLinkLocale
            :to="{
              name: 'login',
            }"
            class="text-primary-500 font-medium"
            >{{ $t('base.auth.registerForm.action.login.title') }}</NuxtLinkLocale
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
          :label="$t('base.auth.registerForm.email.label')"
          validation="required|email"
        />
        <FormKit
          type="email"
          name="email_confirm"
          :label="$t('base.auth.registerForm.email_confirm.label')"
          validation="required|email|confirm"
        />
        <FormKit
          type="password"
          name="password"
          :label="$t('base.auth.registerForm.password.label')"
          validation="required"
        />
        <FormKit
          type="password"
          name="password_confirm"
          :label="$t('base.auth.registerForm.password_confirm.label')"
          validation="required|confirm"
        />

        <UButton
          type="submit"
          block
          :disabled="!valid"
          :loading="status === 'pending' || (status !== 'idle' && !error)"
          icon="i-fa6-solid-right-to-bracket"
          :ui="{
            base: 'mt-8',
          }"
          >{{ $t('base.auth.registerForm.submit.label') }}</UButton
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
