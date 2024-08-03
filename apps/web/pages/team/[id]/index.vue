<script setup lang="ts">
  const { team } = useTeam();

  useHead({
    title: team.value?.name,
  });
</script>

<template>
  <DashboardPage
    :title="
      $t('page.team.id.index.title', {
        teamName: team?.name,
      })
    "
  >
  </DashboardPage>
</template>
