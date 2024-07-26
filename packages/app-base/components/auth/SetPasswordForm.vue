<script setup lang="ts">
  import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
  import type { RouteLocationRaw } from 'vue-router';

  const props = defineProps<{
    goBackRoute: RouteLocationRaw;
  }>();
  const currentUserStore = useCurrentUserStore();

  // form setup
  const form = ref<AuthSetPasswordData>({
    password: '',
    password_confirmation: '',
  });
  const { passwordToggle } = useFormKit();
  const { setPassword } = useAuth();
  const { error, status, execute } = await setPassword({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthSetPasswordData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      const localePath = useLocalePath();
      return await currentUserStore.refetchUser().finally(() => {
        return navigateToLocale({
          name: 'auth-password-set-success',
          query: {
            redirect: props.goBackRoute ? localePath(props.goBackRoute) : undefined,
          },
        });
      });
    },
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
        name="password_confirmation"
        :label="$t('global.password_confirmation.label')"
        validation="required|confirm:password"
        :placeholder="usePlaceholder({ type: 'password' })"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="passwordToggle"
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
        >{{ $t('global.action.auth.setPassword.label') }}</UButton
      >
    </FormKit>
  </div>
</template>
