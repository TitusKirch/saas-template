<script setup lang="ts">
  import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';
  const currentUserStore = useCurrentUserStore();

  // disable two factor authentication
  const { disableTwoFactorAuthentication } = useAuth();
  const {
    status: disableTwoFactorAuthenticationStatus,
    execute: disableTwoFactorAuthenticationExecute,
  } = await disableTwoFactorAuthentication();
  const disableTwoFactorAuthenticationClick = async () => {
    await disableTwoFactorAuthenticationExecute();
    await currentUserStore.refetchUser();
  };
</script>

<template>
  <AuthNeedsToConfirmUserPasswordButton
    v-if="currentUserStore.user?.two_factor_confirmed_at"
    :confirm-password-button-title="
      $t('auth.disableTwoFactorAuthenticationButton.action.confirmPasswordAndDisable.label')
    "
    :confirm-password-button-props="{ block: true }"
    :confirm-password-button-callback="disableTwoFactorAuthenticationClick"
  >
    <UButton
      block
      icon="i-fa6-solid-unlock"
      :loading="disableTwoFactorAuthenticationStatus === 'pending'"
      color="red"
      @click="disableTwoFactorAuthenticationClick"
    >
      {{ $t('auth.disableTwoFactorAuthenticationButton.action.disable.label') }}
    </UButton>
  </AuthNeedsToConfirmUserPasswordButton>
</template>
