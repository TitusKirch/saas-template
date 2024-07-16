<script setup lang="ts">
  const { currentUser } = useCurrentUser();
  const user = await currentUser();

  // disable two factor authentication
  const { refetch } = useCurrentUser();
  const { disableTwoFactorAuthentication } = useAuth();
  const {
    status: disableTwoFactorAuthenticationStatus,
    execute: disableTwoFactorAuthenticationExecute,
  } = await disableTwoFactorAuthentication();
  const disableTwoFactorAuthenticationClick = async () => {
    await disableTwoFactorAuthenticationExecute();
    await refetch();
  };
</script>

<template>
  <AuthNeedsToConfirmUserPasswordButton
    v-if="user?.two_factor_confirmed_at"
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
