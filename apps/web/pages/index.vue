<script setup lang="ts">
  definePageMeta({
    title: 'page.index.meta.title',
    description: 'page.index.meta.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });

  const { fetchCurrentUser, currentUser } = useCurrentUser();

  const clickButton = async () => {
    await fetchCurrentUser();
  };
</script>

<template>
  <DashboardPage :title="$t('page.index.title')">
    <UButton @click="clickButton">Test</UButton>

    <DevCard>
      <DevCode :code="currentUser" title="currentUser" />
    </DevCard>
  </DashboardPage>
</template>
