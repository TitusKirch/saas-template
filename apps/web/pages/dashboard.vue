<script setup lang="ts">
  import { sub } from 'date-fns';

  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });

  const range = ref<any>({ start: sub(new Date(), { days: 14 }), end: new Date() });
  const period = ref<any>('daily');
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Dashboard"> </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <HomeChart :period="period" :range="range" title="Wert A" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <HomeChart :period="period" :range="range" title="Wert B" />
          <HomeChart :period="period" :range="range" title="Wert C" />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
