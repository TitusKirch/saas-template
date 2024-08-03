<script setup lang="ts">
  // team
  const route = useRoute();
  const { getTeam } = useApiTeams();
  const { data, error, status, execute } = getTeam({
    id: route.params.id as string,
    options: {
      immediate: false,
    },
  });
  const { setTeam, reset, team } = useTeam();
  watch(data, (value) => {
    console.log('value', value);
    if (value) {
      setTeam({
        team: value.data,
      });
    }
  });
  onBeforeMount(async () => {
    await execute();
  });
  onUnmounted(() => {
    reset();
  });

  // alert
  const { addAlert, removeAlert } = useAlert();
  const { t } = useI18n();
  const showAlert = () => {
    if (status.value === 'pending') {
      addAlert({
        id: 'getTeamStatus',
        type: 'info',
        title: t('global.alert.loading.title'),
      });
    } else if (status.value === 'error') {
      addAlert({
        id: 'getTeamStatus',
        type: 'error',
        title: t('global.alert.error.title'),
        description: error.value?.data?.message,
      });
    } else {
      removeAlert({
        id: 'getTeamStatus',
      });
    }
  };
  watch(status, () => {
    showAlert();
  });
</script>

<template>
  <NuxtPage v-if="team?.id" />
  <DashboardPage v-else :title="$t('page.team.id.index.meta.title')" />
</template>
