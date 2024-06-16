<script setup lang="ts">
  // form setup
  const form: Ref<AuthLoginData> = ref({
    email: '',
    password: '',
  });
  const { passwordToggle } = useFormKit();
  const { login } = useAuth();
  const {
    data: loginData,
    error,
    status,
    execute,
  } = await login({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthLoginData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      const { redirect } = useRoute().query;

      // check for 2fa
      if (loginData.value && 'two_factor' in loginData.value && loginData.value.two_factor) {
        return navigateToLocale({
          name: 'auth-two-factor-challenge',
          query: {
            redirect: redirect as string,
          },
        });
      }

      const { me } = useUser();
      await me();

      if (redirect) {
        return navigateToLocale(redirect as string);
      }

      return navigateToLocale({
        name: 'index',
      });
    },
  });

  // third party providers
  const { thirdPartyProviders } = useAuth();
  const providers = thirdPartyProviders();
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
        type="email"
        name="email"
        :label="$t('global.email.label')"
        validation="required|email"
        :placeholder="usePlaceholder({ type: 'email' })"
        prefix-icon="email"
        autocomplete="username"
      />
      <FormKit
        type="password"
        name="password"
        :label="$t('global.password.label')"
        validation="required"
        :placeholder="usePlaceholder({ type: 'password' })"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="passwordToggle"
        autocomplete="current-password"
      >
        <template #help="context">
          <div :for="context.id" :class="context.classes.help">
            <BaseLink
              variant="underline"
              :to="{
                name: 'auth-password-forgot',
              }"
            >
              {{ $t('global.action.auth.forgotPassword.label') }}
            </BaseLink>
          </div>
        </template>
      </FormKit>

      <FormKit
        type="toggle"
        name="remember"
        :label="$t('global.auth.rememberMe.label')"
        :default="true"
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

    <UDivider :label="$t('global.or.label')" />

    <div v-if="providers?.length" class="space-y-3">
      <UButton
        v-for="(provider, index) in providers"
        :key="index"
        v-bind="provider"
        color="gray"
        block
        @click="provider.click"
      />
    </div>
  </div>
</template>
