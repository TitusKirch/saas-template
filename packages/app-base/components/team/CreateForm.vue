<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      mode?: 'create' | 'update';
      team?: Team;
    }>(),
    {
      mode: 'create',
      team: undefined,
    }
  );
  const emit = defineEmits<{
    success: [
      {
        data: Ref<TeamsUpdateResponse | null>;
      },
    ];
  }>();

  const { t } = useI18n();
  const { createTeam, updateTeam } = useApiTeams();

  // form setup
  const form = ref<TeamsCreateRequestData | TeamsUpdateRequestData>({
    name: '',
    description: '',
  });
  if (props.mode === 'update' && props.team) {
    form.value = {
      ...form.value,
      name: props.team.name,
      description: props.team.description,
    };
  }
  const formFunction = () => {
    if (props.mode === 'update' && props.team) {
      return updateTeam({
        id: props.team.id,
        data: form,
        options: {
          immediate: false,
          watch: false,
        },
      });
    } else {
      return createTeam({
        data: form,
        options: {
          immediate: false,
          watch: false,
        },
      });
    }
  };
  const { data, error, status, execute } = formFunction();
  const { submit, errorMessages } = useFormKitForm<TeamsCreateRequestData>({
    form,
    error,
    status,
    executeCallback: async () => {
      console.info('executeCallback', form.value);
      await execute();
    },
    successCallback: async () => {
      useNotification({
        type: 'success',
        title: t('global.notification.success.title'),
        description: t(`team.createForm.mode.${props.mode}.notification.success.description`),
      });

      emit('success', {
        data: data,
      });
    },
  });
</script>

<template>
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
    />

    <FormKit
      type="textarea"
      name="description"
      :label="$t('team.description.label')"
      :placeholder="$t('team.description.placeholder')"
      prefix-icon="textarea"
      auto-height
      validation="length:0,1024"
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
          {{ $t(`team.createForm.mode.${props.mode}.submit.label`) }}
        </UButton>
      </template>
    </UDashboardSection>
  </FormKit>
</template>
