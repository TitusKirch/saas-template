<script setup lang="ts">
  definePageMeta({
    title: 'page.team.create.title',
    description: 'page.team.create.description',
  });
</script>

<template>
  <DashboardPage :title="$t('page.team.create.title')">
    <TeamCreateForm />
  </DashboardPage>
</template>
