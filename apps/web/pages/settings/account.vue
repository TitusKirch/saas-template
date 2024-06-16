<script setup lang="ts">
  const { me } = useUser();
  const user = await me();

  // form setup
  const form: Ref<UpdateUserMeData> = ref({
    first_name: user.value?.first_name || '',
    last_name: user.value?.last_name || '',
    email: user.value?.email || '',
    password: '',
    password_confirmation: '',
  });
  const formValuesBeforeSubmit: Ref<UpdateUserMeData> = ref({ ...form.value });
  const { passwordToggle } = useFormKit();
  const formValuesHasChanged = computed(() => {
    return Object.keys(form.value).some(
      (key) =>
        form.value[key as keyof UpdateUserMeData] !==
        formValuesBeforeSubmit.value[key as keyof UpdateUserMeData]
    );
  });
  const { updateMe, refetchMe } = useUser();
  const { t } = useI18n();
  const { error, status, execute } = await updateMe({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<UpdateUserMeData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      await refetchMe();

      formValuesBeforeSubmit.value = { ...form.value };

      useNotification({
        type: 'success',
        title: t('global.notification.success.title'),
        description: t('page.settings.account.notification.success.description'),
      });
    },
  });

  // classes for same style
  // const dashboardSectionLinksDivClasses = 'flex flex-col w-full md:w-auto md:min-w-80';
  const formkitFieldClasses = {
    label: '$reset hidden',
  };

  // TODO: Use correct type here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = ref<any | null>(null);
</script>

<template>
  <div>
    <FormKit
      ref="formRef"
      v-slot="{ state: { valid } }"
      v-model="form"
      type="form"
      :actions="false"
      :disabled="status === 'success'"
      @submit="submit"
    >
      <UDashboardSection
        :title="$t('page.settings.account.section.name.title')"
        :description="$t('page.settings.account.section.name.description')"
      >
        <template #links>
          <FormKit
            type="text"
            name="first_name"
            :label="$t('global.first_name.label')"
            validation="required"
            :placeholder="$t('global.first_name.label')"
            prefix-icon="people"
            :classes="formkitFieldClasses"
          />
          <FormKit
            type="text"
            name="last_name"
            :label="$t('global.last_name.label')"
            validation="required"
            :placeholder="$t('global.last_name.label')"
            prefix-icon="people"
            :classes="formkitFieldClasses"
          />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.email.label')"
        :description="$t('page.settings.account.section.email.description')"
      >
        <template #links>
          <FormKit
            type="text"
            name="email"
            :label="$t('global.email.label')"
            validation="required|email"
            :placeholder="usePlaceholder({ type: 'email' })"
            prefix-icon="email"
            :classes="formkitFieldClasses"
            autocomplete="username"
          />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.password.label')"
        :description="$t('page.settings.account.section.password.description')"
      >
        <template #links>
          <FormKit
            type="password"
            name="password"
            :label="$t('global.password.label')"
            :placeholder="$t('global.password.label')"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            :classes="formkitFieldClasses"
            @suffix-icon-click="passwordToggle"
            autocomplete="new-password"
          />
          <FormKit
            type="password"
            name="password_confirmation"
            :label="$t('global.password_confirmation.label')"
            validation="confirm:password"
            :placeholder="$t('global.password_confirmation.label')"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            :classes="formkitFieldClasses"
            @suffix-icon-click="passwordToggle"
            autocomplete="new-password"
          />
        </template>
      </UDashboardSection>

      <UDashboardSection>
        <template #links>
          <AuthNeedsToConfirmUserPasswordButton
            :confirm-password-button-props="{ block: true, disabled: !formValuesHasChanged }"
            :confirm-password-button-callback="() => formRef?.node.submit()"
            :confirm-password-button-title="$t('global.action.confirmPasswordAndSave.label')"
          >
            <UButton
              type="submit"
              block
              :disabled="!valid || !!Object.keys(errorMessages).length || !formValuesHasChanged"
              :loading="status === 'pending'"
              icon="i-fa6-solid-floppy-disk"
              >{{ $t('global.action.save.label') }}</UButton
            >
          </AuthNeedsToConfirmUserPasswordButton>
        </template>
      </UDashboardSection>
    </FormKit>
  </div>
</template>
