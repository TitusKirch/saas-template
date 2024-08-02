<script setup lang="ts">
  definePageMeta({
    title: 'page.team.create.title',
    description: 'page.team.create.description',
  });

  // form setup
  const { fetchCurrentUser } = useCurrentUser();
  const form = ref<TeamsCreateRequestData>({
    name: '',
  });
  const { createTeam } = useApiTeams();
  const { data, error, status, execute } = await createTeam({
    data: form,
    options: {
      immediate: false,
      watch: false,
    },
  });
  const { t } = useI18n();
  const { submit, errorMessages } = useFormKitForm<TeamsCreateRequestData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      useNotification({
        type: 'success',
        title: t('global.notification.success.title'),
        description: t('page.team.create.section.form.notification.success.description'),
      });

      await fetchCurrentUser();

      return navigateToLocale({
        name: 'team-id',
        params: {
          id: data.value?.data.id,
        },
      });
    },
    errorCallback: async () => {},
  });
</script>

<template>
  <DashboardPage :title="$t('page.team.create.title')">
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
        type="text"
        name="name"
        :label="$t('team.name.label')"
        validation="required"
        :placeholder="$t('team.name.placeholder')"
        prefix-icon="people"
        autocomplete="username"
        :classes="{
          outer: 'md:col-span-2',
        }"
      />

      <UDashboardSection
        :ui="{
          wrapper: 'mt-8',
        }"
      >
        <template #links>
          <UButton
            type="submit"
            block
            :disabled="!valid || !!Object.keys(errorMessages).length"
            :loading="status === 'pending' || (status !== 'idle' && !error)"
            icon="i-fa6-solid-paper-plane"
          >
            {{ $t('page.team.create.section.form.submit.label') }}
          </UButton>
        </template>
      </UDashboardSection>
    </FormKit>
  </DashboardPage>
</template>
