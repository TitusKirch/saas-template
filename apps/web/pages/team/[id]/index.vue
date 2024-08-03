<script setup lang="ts">
  const { team } = useTeam();

  useHead({
    title: team.value?.name,
  });

  const clickHandler = () => {
    navigateToLocale({
      name: 'team-id-edit',
      params: {
        id: team.value?.id.toString(),
      },
    });
  };
</script>

<template>
  <DashboardPage
    :title="
      $t('page.team.id.index.title', {
        teamName: team?.name,
      })
    "
  >
    <UButton @click="clickHandler">Click me</UButton>
  </DashboardPage>
</template>
