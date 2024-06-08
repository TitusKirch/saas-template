<script setup lang="ts">
  import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';
  const dashboardStore = useDashboardStore();
  const { getLayoutOptions } = useDashboard();
</script>

<template>
  <ClientOnly>
    <FormKit
      type="dropdown"
      name="preference"
      v-model="dashboardStore.layout"
      popover
      :options="getLayoutOptions"
    >
      <template #option="{ option, classes }">
        <FormDropdownOption :option="option" :classes="classes" />
      </template>
    </FormKit>

    <template #fallback>
      <FormKit
        type="dropdown"
        name="preference"
        v-model="dashboardStore.layout"
        popover
        :options="getLayoutOptions"
        disabled
      >
        <template #option="{ option, classes }">
          <FormDropdownOption :option="option" :classes="classes" />
        </template>
      </FormKit>
    </template>
  </ClientOnly>
</template>
