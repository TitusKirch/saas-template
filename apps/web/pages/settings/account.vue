<script setup lang="ts">
  const { me } = useUser();
  const user = await me();

  // form setup
  type Form = UpdateUserMeForm;
  const form: Ref<Form> = ref({
    first_name: user.value?.first_name || '',
    last_name: user.value?.last_name || '',
    email: user.value?.email || '',
    password: '',
    password_confirm: '',
  });
  const formValuesBeforeSubmit: Ref<Form> = ref({ ...form.value });
  const errorMessages: Ref<Record<string, string>> = ref({});
  const { passwordToggle } = useFormKit();
  const formValuesHasChanged = computed(() => {
    return Object.keys(form.value).some(
      (key) => form.value[key as keyof Form] !== formValuesBeforeSubmit.value[key as keyof Form]
    );
  });

  // submit handling
  const { updateMe, transformUserUpdateMeFormToData, refetchMe } = useUser();
  const updateData: Ref<UpdateUserMeData | undefined> = ref();
  const { error, status, execute } = await updateMe({
    data: updateData,
  });
  const submit = async (data: Form, node: FormKitNode) => {
    updateData.value = transformUserUpdateMeFormToData({
      form: form.value,
    });
    await execute();
    errorMessages.value = {};
    if (error.value?.data?.errors) {
      for (const key in error.value.data.errors) {
        errorMessages.value[key] = error.value.data.errors[key][0];
      }
      node.setErrors([], errorMessages.value);
      return false;
    } else if (error.value?.data?.message) {
      errorMessages.value = {
        form: error.value.data.message,
      };
      return false;
    }

    if (status.value === 'success') {
      await refetchMe();

      formValuesBeforeSubmit.value = { ...form.value };

      useNotification({
        type: 'success',
        title: t('global.notification.success.title'),
        description: t('page.settings.account.notification.success.description'),
      });
    }
  };
  const { t } = useI18n();

  // error handling
  watch(form, (newValue: Form, oldValue: Form) => {
    for (const key of Object.keys(newValue) as Array<keyof Form>) {
      if (newValue[key] !== oldValue[key]) {
        // TODO: Refactor to doesn't use dynamic delete
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete errorMessages.value[key];
      }
    }
  });

  // classes for same style
  const dashboardSectionUiClasses = {
    container: 'items-start',
    links: 'w-full md:w-auto md:min-w-80',
  };
  const dashboardSectionLinksDivClasses = 'flex flex-col w-full md:w-auto md:min-w-80';
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
        :ui="{
          ...dashboardSectionUiClasses,
        }"
      >
        <template #links>
          <div :class="dashboardSectionLinksDivClasses">
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
          </div>
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.email.label')"
        :description="$t('page.settings.account.section.email.description')"
        :ui="{
          ...dashboardSectionUiClasses,
        }"
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
          />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.password.label')"
        :description="$t('page.settings.account.section.password.description')"
        :ui="{
          ...dashboardSectionUiClasses,
        }"
      >
        <template #links>
          <div :class="dashboardSectionLinksDivClasses">
            <FormKit
              type="password"
              name="password"
              :label="$t('global.password.label')"
              :placeholder="$t('global.password.label')"
              prefix-icon="password"
              suffix-icon="eyeClosed"
              :classes="formkitFieldClasses"
              @suffix-icon-click="passwordToggle"
            />
            <FormKit
              type="password"
              name="password_confirm"
              :label="$t('global.password_confirm.label')"
              validation="confirm"
              :placeholder="$t('global.password_confirm.label')"
              prefix-icon="password"
              suffix-icon="eyeClosed"
              :classes="formkitFieldClasses"
              @suffix-icon-click="passwordToggle"
            />
          </div>
        </template>
      </UDashboardSection>

      <UDashboardSection
        :ui="{
          ...dashboardSectionUiClasses,
        }"
      >
        <template #links>
          <AuthNeedsToConfirmUserPasswordButton
            :confirm-password-button-props="{ block: true }"
            :confirm-password-button-callback="() => formRef?.node.submit()"
          >
            <UButton
              id="example-submit-button"
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
