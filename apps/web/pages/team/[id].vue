<script setup lang="ts">
  const route = useRoute();

  // team
  const { fetchTeamByRoute, fetchTeamByRouteStatus, fetchTeamByRouteError, reset, team } =
    useTeam();
  onBeforeMount(async () => {
    if (BigInt(route.params?.id as string) != team.value?.id) {
      await fetchTeamByRoute();
    }
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
          title: t('alert.loading.title'),
        },
      });
    } else if (fetchTeamByRouteStatus.value === 'error') {
      addAlert({
        alert: {
          id: 'getTeamStatus',
          type: 'error',
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

  const showPage = ref<boolean>(!!team.value);
  watch(
    () => team.value,
    () => {
      if (team.value) {
        showPage.value = true;
      }
    }
  );
</script>

<template>
  <NuxtPage v-if="showPage" />
</template>
