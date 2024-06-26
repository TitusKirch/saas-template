<script setup lang="ts">
  // import type { FormKitNode } from '@formkit/core';

  const { me } = useUser();
  const user = await me();

  const showAuthUserTwoFactorRecoveryCodesModal = ref(false);
  const authUserTwoFactorRecoveryCodesModalForceToDownload = ref(false);
  const openAuthUserTwoFactorRecoveryCodesModal = () => {
    showAuthUserTwoFactorRecoveryCodesModal.value = true;
  };
  watch(
    () => showAuthUserTwoFactorRecoveryCodesModal.value,
    (value) => {
      if (!value) {
        authUserTwoFactorRecoveryCodesModalForceToDownload.value = false;
      }
    }
  );
</script>

<template>
  <div>
    <UDashboardSection
      :title="$t('page.settings.security.section.twoFactorAuthentication.title')"
      :description="$t('page.settings.security.section.twoFactorAuthentication.description')"
    >
      <template #links>
        <AuthDisableTwoFactorAuthenticationButton v-if="user?.twoFactorConfirmedAt" />
        <AuthEnableTwoFactorAuthenticationForm
          v-else
          @success="
            () => {
              authUserTwoFactorRecoveryCodesModalForceToDownload = true;
              openAuthUserTwoFactorRecoveryCodesModal();
            }
          "
        />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UDashboardSection
      v-show="user?.twoFactorConfirmedAt"
      :title="$t('page.settings.security.section.twoFactorRecoveryCodes.title')"
      :description="$t('page.settings.security.section.twoFactorRecoveryCodes.description')"
    >
      <template #links>
        <AuthNeedsToConfirmUserPasswordButton
          :confirm-password-button-title="
            $t(
              'page.settings.security.section.twoFactorRecoveryCodes.action.confirmPasswordAndShow.label'
            )
          "
          :confirm-password-button-props="{ block: true }"
          :confirm-password-button-callback="openAuthUserTwoFactorRecoveryCodesModal"
        >
          <UButton block icon="i-fa6-solid-eye" @click="openAuthUserTwoFactorRecoveryCodesModal">
            {{ $t('page.settings.security.section.twoFactorRecoveryCodes.action.show.label') }}
          </UButton>
        </AuthNeedsToConfirmUserPasswordButton>

        <AuthUserTwoFactorRecoveryCodesModal
          v-model="showAuthUserTwoFactorRecoveryCodesModal"
          :force-to-download="authUserTwoFactorRecoveryCodesModalForceToDownload"
        />
      </template>
    </UDashboardSection>
  </div>
</template>
