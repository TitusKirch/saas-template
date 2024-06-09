<script setup lang="ts">
  definePageMeta({
    title: 'page.settings.title',
    description: 'page.settings.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });

  // links
  const { t } = useI18n();
  const localePath = useLocalePath();
  const links = ref([
    [
      {
        label: t('page.settings.index.title'),
        icon: 'i-fa6-solid-gears',
        to: localePath({
          name: 'settings',
        }),
        exact: true,
      },
      {
        label: t('page.settings.account.title'),
        icon: 'i-fa6-solid-circle-user',
        to: localePath({
          name: 'settings-account',
        }),
      },
      {
        label: t('page.settings.notifications.title'),
        icon: 'i-fa6-solid-bell',
        to: localePath({
          name: 'settings-notifications',
        }),
      },
    ],
  ]);
</script>

<template>
  <DashboardPage :title="$t('page.settings.title')" :toolbar-is-navigation="true">
    <template #toolbar>
      <UHorizontalNavigation :links="links" />
    </template>

    <NuxtPage />
  </DashboardPage>
</template>
