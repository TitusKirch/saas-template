<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';
  const authStore = useAuthStore();

  const props = defineProps<{
    confirmPasswordButtonCallback: () => Promise<any>;
  }>();
  const model = defineModel();

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
      await props.confirmPasswordButtonCallback();
      model.value = false;
    }
  };

  // error handling
  watch(form, (newValue: Form, oldValue: Form) => {
    const updatedErrorMessages: typeof errorMessages.value = {};
    for (const key of Object.keys(newValue) as Array<keyof Form>) {
      if (newValue[key] === oldValue[key] && errorMessages.value[key]) {
        updatedErrorMessages[key] = errorMessages.value[key];
      }
    }
    errorMessages.value = updatedErrorMessages;
  });

  // reset form on close
  const resetTimeout = ref<NodeJS.Timeout | null>(null);
  watch(
    () => model.value,
    (newValue) => {
      if (!newValue) {
        resetTimeout.value = setTimeout(() => {
          form.value = {
            password: '',
          };
          errorMessages.value = {};
        }, 500);
      }
    }
  );
  onBeforeUnmount(() => {
    if (resetTimeout.value) {
      clearTimeout(resetTimeout.value);
    }
  });
</script>
<template>
  <BaseModal
    v-model="model"
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
          type="button"
          :disabled="!valid || !!Object.keys(errorMessages).length"
          :loading="status === 'pending' || (status !== 'idle' && !error)"
          icon="i-fa6-solid-check"
          @click="submit"
          >{{ $t('global.action.confirm.label') }}
        </UButton>
        <UButton color="white" :label="$t('global.action.cancel.label')" @click="model = false" />
      </BaseButtonContainer>
    </FormKit>
  </BaseModal>
</template>
