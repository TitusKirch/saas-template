<script setup lang="ts">
  // form setup
  const form: Ref<AuthRegisterData> = ref({
    first_name: '',
    last_name: '',
    email: '',
    email_confirmation: '',
    password: '',
    password_confirmation: '',
    remember: false,
  });
  const { passwordToggle } = useFormKit();
  const { register } = useAuth();
  const { error, status, execute } = await register({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<AuthRegisterData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      const { me } = useUser();
      await me();

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

      <div class="grid gap-x-4 lg:grid-cols-2">
        <FormKit
          type="text"
          name="first_name"
          :label="$t('global.first_name.label')"
          validation="required"
          :placeholder="usePlaceholder({ type: 'first_name' })"
          prefix-icon="people"
          autocomplete="given-name"
        />
        <FormKit
          type="text"
          name="last_name"
          :label="$t('global.last_name.label')"
          validation="required"
          :placeholder="usePlaceholder({ type: 'last_name' })"
          prefix-icon="people"
          autocomplete="family-name"
        />
      </div>
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
        type="email"
        name="email_confirmation"
        :label="$t('global.email_confirmation.label')"
        validation="required|email|confirm:email"
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
        autocomplete="new-password"
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
        autocomplete="new-password"
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
        >{{ $t('global.action.auth.register.label') }}</UButton
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
