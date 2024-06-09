<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

  // form setup
  type Form = AuthLoginForm;
  const form: Ref<Form> = ref({
    email: '',
    password: '',
  });
  const errorMessages: Ref<Record<string, string>> = ref({});
  const { passwordToggle } = useFormKit();

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

      const { redirect } = useRoute().query;

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
        // TODO: Refactor to doesn't use dynamic delete
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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
      <FormKit
        type="password"
        name="password"
        :label="$t('global.password.label')"
        validation="required"
        :placeholder="usePlaceholder({ type: 'password' })"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        help="TEST"
        @suffix-icon-click="passwordToggle"
      >
        <template #help="context">
          <div :for="context.id" :class="context.classes.help">
            <BaseLink
              variant="underline"
              :to="{
                name: 'auth-password-forgot',
              }"
            >
              {{ $t('global.action.auth.forgotPassword.label') }}
            </BaseLink>
          </div>
        </template>
      </FormKit>

      <FormKit
        type="toggle"
        name="remember"
        :label="$t('global.auth.rememberMe.label')"
        :default="true"
      />

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(errorMessages).length"
        :loading="status === 'pending' || (status !== 'idle' && !error)"
        icon="i-fa6-solid-right-to-bracket"
        :ui="{
          base: 'mt-8',
        }"
        >{{ $t('global.action.auth.login.label') }}</UButton
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
