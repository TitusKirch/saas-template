<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });

  import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

  const currentUserStore = useCurrentUserStore();

  const clickButton = async () => {
    await currentUserStore.fetchUser({
      force: true,
    });
  };
</script>

<template>
  <DashboardPage :title="$t('page.index.title')">
    <UButton @click="clickButton">Test</UButton>

    <DevCard>
      <DevCode :code="currentUserStore.user" title="currentUserStore.user" />
    </DevCard>
  </DashboardPage>
</template>
