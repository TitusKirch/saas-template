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
        <div :class="`${classes.option} flex items-center`">
          <UIcon :name="option.icon" class="w-5 mr-2" />
          <span>
            {{ option.label }}
          </span>
        </div>
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
          <div :class="`${classes.option} flex items-center`">
            <UIcon :name="option.icon" class="w-5 mr-2" />
            <span>
              {{ option.label }}
            </span>
          </div>
        </template>
      </FormKit>
    </template>
  </ClientOnly>
</template>
