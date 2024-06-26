<script setup lang="ts">
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';
  const authStore = useAuthStore();

  const props = defineProps<{
    confirmPasswordButtonCallback: () => Promise<void>;
  }>();
  const model = defineModel<boolean>();

  // form setup
  const form: Ref<AuthUserConfirmPasswordData> = ref({
    password: '',
  });
  const { passwordToggle } = useFormKit();
  const { userConfirmPassword } = useAuth();
  const { error, status, execute } = await userConfirmPassword({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthUserConfirmPasswordData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      authStore.confirmUserPasswordConfirmed();
      await props.confirmPasswordButtonCallback();
      model.value = false;
    },
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
