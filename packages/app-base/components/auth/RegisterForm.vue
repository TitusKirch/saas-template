<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

  // form setup
  type Form = AuthRegisterForm;
  const form: Ref<Form> = ref({
    first_name: '',
    last_name: '',
    email: '',
    email_confirm: '',
    password: '',
    password_confirm: '',
    remember: false,
  });
  const errorMessages: Ref<Record<string, string>> = ref({});
  const { passwordToggle } = useFormKit();

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

      <div class="grid md:grid-cols-2 gap-4">
        <FormKit
          type="text"
          name="first_name"
          :label="$t('global.first_name.label')"
          validation="required"
          :placeholder="usePlaceholder({ type: 'first_name' })"
          prefix-icon="people"
        />
        <FormKit
          type="text"
          name="last_name"
          :label="$t('global.last_name.label')"
          validation="required"
          :placeholder="usePlaceholder({ type: 'last_name' })"
          prefix-icon="people"
        />
      </div>
      <FormKit
        type="email"
        name="email"
        :label="$t('global.email.label')"
        validation="required|email"
        :placeholder="usePlaceholder({ type: 'email' })"
        prefix-icon="email"
      />
      <FormKit
        type="email"
        name="email_confirm"
        :label="$t('global.email_confirm.label')"
        validation="required|email|confirm"
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
        :disabled="!valid || !!Object.keys(errorMessages).length"
        :loading="status === 'pending' || (status !== 'idle' && !error)"
        icon="i-fa6-solid-right-to-bracket"
        :ui="{
          base: 'mt-8',
        }"
        >{{ $t('global.action.auth.register.label') }}</UButton
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
