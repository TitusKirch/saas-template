<script setup lang="ts">
  const { emailIsVerified, resendVerificationEmail } = useUser();
</script>

<template>
  <BaseAlert
    v-if="!emailIsVerified()"
    :title="$t('user.emailIsNotVerifiedAlert.title')"
    type="warning"
    :actions="[
      {
        label: $t('user.emailIsNotVerifiedAlert.action.resendVerificationEmail.label'),
        color: 'orange',
        click: async () => {
          await resendVerificationEmail();
        },
      },
    ]"
  />
</template>
