<script setup lang="ts">
  // disable two factor authentication
  const { fetchCurrentUser, currentUser } = useNewCurrentUser();
  const { disableTwoFactorAuthentication } = useApiAuth();
  const {
    status: disableTwoFactorAuthenticationStatus,
    execute: disableTwoFactorAuthenticationExecute,
  } = await disableTwoFactorAuthentication({
    options: {
      immediate: false,
      watch: false,
    },
  });
  const disableTwoFactorAuthenticationClick = async () => {
    await disableTwoFactorAuthenticationExecute();
    await fetchCurrentUser();
  };
</script>

<template>
  <AuthNeedsToConfirmUserPasswordButton
    v-if="currentUser?.two_factor_confirmed_at"
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
