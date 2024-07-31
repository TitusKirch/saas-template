<script setup lang="ts">
  const { fetchCurrentUser } = useNewCurrentUser();

  withDefaults(
    defineProps<{
      type: AuthTwoFactorChallengeType;
    }>(),
    {
      type: 'code',
    }
  );

  // form setup
  const form = ref<AuthTwoFactorChallengeData>({
    code: '',
  });
  const { passwordToggle } = useFormKit();
  const { twoFactorChallenge } = useApiAuth();
  const { error, status, execute } = await twoFactorChallenge({
    data: form,
    options: {
      immediate: false,
      watch: false,
    },
  });
  const { submit, errorMessages } = useFormKitForm<AuthTwoFactorChallengeData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      const { redirect } = useRoute().query;

      return await fetchCurrentUser().finally(async () => {
        if (redirect && redirect != '/' && (redirect as string).startsWith('/')) {
          const localeRoute = useLocaleRoute();
          const localeRedirectRoute = localeRoute(redirect as string);

          if (
            localeRedirectRoute?.name &&
            !(localeRedirectRoute.name as string).startsWith('auth-')
          ) {
            return navigateToLocale(redirect as string);
          }
        }

        return navigateToLocale({
          name: 'index',
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
        v-if="type === 'code'"
        type="otp"
        name="code"
        :label="$t('global.twoFactorChallenge.code.label')"
        validation="required"
      />

      <FormKit
        v-else-if="type === 'recoveryCode'"
        type="password"
        name="recovery_code"
        :label="$t('global.twoFactorChallenge.recoveryCode.label')"
        validation="required"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="passwordToggle"
      />

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(errorMessages).length"
        :loading="status === 'pending' || (status !== 'idle' && !error)"
        icon="i-fa6-solid-right-to-bracket"
        :ui="{
          base: 'mt-8',
        }"
        >{{ $t('global.action.auth.login.label') }}</UButton
      >
    </FormKit>
  </div>
</template>
