<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';
  const authStore = useAuthStore();

  type Form = AuthUserConfirmPasswordForm;
  const form: Ref<Form> = ref({
    password: '',
  });
  const errorMessages: Ref<Record<string, string>> = ref({});
  const { passwordToggle } = useFormKit();

  // submit handling
  const { userConfirmPassword } = useAuth();
  const userConfirmPasswordData: Ref<AuthUserConfirmPasswordData | undefined> = ref();
  const { error, status, execute } = await userConfirmPassword({
    data: userConfirmPasswordData,
  });
  const submit = async (data: Form, node: FormKitNode) => {
    userConfirmPasswordData.value = form.value;
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
      console.log('success');
      authStore.confirmUserPasswordConfirmed();
      await authStore.executeUserPasswordConfirmModalSuccessCallback();
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
  <BaseModal
    v-model="authStore.userPasswordConfirmModalIsOpen"
    :title="$t('auth.userPasswordConfirmModal.title')"
    :description="$t('auth.userPasswordConfirmModal.description')"
    type="warning"
  >
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
        type="password"
        name="password"
        :label="$t('global.password.label')"
        validation="required"
        :placeholder="usePlaceholder({ type: 'password' })"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="passwordToggle"
      />

      <BaseButtonContainer class="mt-8">
        <UButton
          type="submit"
          :disabled="!valid || !!Object.keys(errorMessages).length"
          :loading="status === 'pending' || (status !== 'idle' && !error)"
          icon="i-fa6-solid-check"
          >{{ $t('global.action.confirm.label') }}
        </UButton>
        <UButton
          color="white"
          :label="$t('global.action.cancel.label')"
          @click="authStore.hideUserPasswordConfirmModal"
        />
      </BaseButtonContainer>
    </FormKit>
  </BaseModal>
</template>
