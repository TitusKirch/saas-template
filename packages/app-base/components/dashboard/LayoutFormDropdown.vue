<script setup lang="ts">
  import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';
  const dashboardStore = useDashboardStore();
  const { layoutOptions } = useDashboard();
</script>

<template>
  <ClientOnly>
    <FormKit
      v-model="dashboardStore.layout"
      type="dropdown"
      name="preference"
      popover
      :options="layoutOptions"
    >
      <template #option="{ option, classes }">
        <FormDropdownOption :option="option" :classes="classes" />
      </template>
    </FormKit>

    <template #fallback>
      <FormKit
        v-model="dashboardStore.layout"
        type="dropdown"
        name="preference"
        popover
        :options="layoutOptions"
        disabled
      >
        <template #option="{ option, classes }">
          <FormDropdownOption :option="option" :classes="classes" />
        </template>
      </FormKit>
    </template>
  </ClientOnly>
</template>
