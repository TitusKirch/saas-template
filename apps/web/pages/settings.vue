<script setup lang="ts">
  definePageMeta({
    title: 'page.settings.title',
    description: 'page.settings.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });

  // links
  const { t } = useI18n();
  const links = [
    [
      {
        label: t('page.settings.index.title'),
        icon: 'i-fa6-solid-circle-user',
        to: '/settings',
        exact: true,
      },
      {
        label: t('page.settings.notifications.title'),
        icon: 'i-fa6-solid-bell',
        to: '/settings/notifications',
      },
    ],
  ];
</script>

<template>
  <DashboardPage :title="$t('page.settings.title')" :toolbar-is-navigation="true">
    <template #toolbar>
      <UHorizontalNavigation :links="links" />
    </template>

    <NuxtPage />
  </DashboardPage>
</template>
