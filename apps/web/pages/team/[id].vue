<script setup lang="ts">
  const route = useRoute();

  // team
  const { fetchTeamByRoute, fetchTeamByRouteStatus, fetchTeamByRouteError, reset, team } =
    useTeam();
  onBeforeMount(async () => {
    await fetchTeamByRoute();
  });
  onUnmounted(() => {
    reset();
  });

  // alert
  const { addAlert, removeAlert } = useAlert();
  const { t } = useI18n();
  const showAlert = () => {
    if (fetchTeamByRouteStatus.value === 'pending') {
      addAlert({
        alert: {
          id: 'getTeamStatus',
          type: 'info',
          title: t('global.alert.loading.title'),
        },
      });
    } else if (fetchTeamByRouteStatus.value === 'error') {
      addAlert({
        alert: {
          id: 'getTeamStatus',
          type: 'error',
          title: t('global.alert.error.title'),
          description: fetchTeamByRouteError.value?.data?.message,
        },
      });
    } else {
      removeAlert({
        id: 'getTeamStatus',
      });
    }
  };
  watch(fetchTeamByRouteStatus, () => {
    showAlert();
  });
</script>

<template>
  <NuxtPage
    v-if="team?.id == BigInt(route.params.id as string) && fetchTeamByRouteStatus === 'success'"
  />
  <DashboardPage v-else :title="$t('page.team.id.index.meta.title')" />
</template>
