<script setup lang="ts">
  const { team } = useTeam();

  definePageMeta({
    title: 'page.team.id.edit.meta.title',
    description: 'page.team.id.edit.meta.description',
  });
</script>

<template>
  <DashboardPage
    :title="
      $t('page.team.id.edit.title', {
        teamName: team?.name,
      })
    "
  >
    <TeamCreateForm mode="update" :team="team" />
  </DashboardPage>
</template>
