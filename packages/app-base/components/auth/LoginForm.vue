<script setup lang="ts">
  // form setup
  const turnstile = ref();
  const turnstileToken = ref('');
  const form = ref<AuthLoginData>({
    email: '',
    password: '',
    'cf-turnstile-response': '',
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
    beforeExecuteCallback: async () => {
      form.value['cf-turnstile-response'] = turnstileToken.value;
    },
    executeCallback: execute,
    successCallback: async () => {
      const { redirect } = useRoute().query;

      // check for 2fa
      if (loginData.value && 'two_factor' in loginData.value && loginData.value.two_factor) {
        return navigateToLocale({
          name: 'auth-two-factor-challenge',
          query: {
            redirect:
              redirect && redirect != '/' && (redirect as string).startsWith('/')
                ? redirect
                : undefined,
          },
        });
      }

      const { currentUser } = useCurrentUser();
      return await me().finally(async () => {
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
    errorCallback: async () => {
      turnstile.value?.reset();
    },
  });

  // third party providers
  const { authProviders } = useAuth();
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
        autocomplete="current-password"
        @suffix-icon-click="passwordToggle"
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

      <FormTurnstileContainer :first-show-on="valid">
        <NuxtTurnstile
          ref="turnstile"
          v-model="turnstileToken"
          :options="{
            action: 'login',
          }"
        />
      </FormTurnstileContainer>

      <UButton
        type="submit"
        block
        :disabled="!valid || !!Object.keys(errorMessages).length || !turnstileToken"
        :loading="status === 'pending' || (status !== 'idle' && !error)"
        icon="i-fa6-solid-right-to-bracket"
        :ui="{
          base: 'mt-8',
        }"
      >
        {{ $t('global.action.auth.login.label') }}
      </UButton>
    </FormKit>

    <UDivider :label="$t('global.or.label')" />

    <div v-if="authProviders()?.length" class="space-y-3">
      <UButton
        v-for="authProvider in authProviders()"
        :key="authProvider.provider"
        v-bind="authProvider"
        color="gray"
        block
        @click="authProvider.click"
      />
    </div>
  </div>
</template>
