<script setup lang="ts">
  const { me } = useUser();
  const user = await me();

  // disable two factor authentication
  const { refetchMe } = useUser();
  const { disableTwoFactorAuthentication } = useAuth();
  const {
    status: disableTwoFactorAuthenticationStatus,
    execute: disableTwoFactorAuthenticationExecute,
  } = await disableTwoFactorAuthentication();
  const disableTwoFactorAuthenticationClick = async () => {
    await disableTwoFactorAuthenticationExecute();
    await refetchMe();
  };
</script>

<template>
  <AuthNeedsToConfirmUserPasswordButton
    v-if="user?.twoFactorConfirmedAt"
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
