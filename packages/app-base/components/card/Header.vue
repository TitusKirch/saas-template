<script setup lang="ts">
  defineProps<{
    title: string;
    description?: string;
  }>();
</script>
<template>
  <div class="-mb-5 flex flex-row items-center justify-between gap-4">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold leading-tight text-gray-900 dark:text-white">
        {{ title }}
      </h2>
      <p v-if="description" class="text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>

    <slot name="beforeActions" />

    <div v-if="$slots.actions">
      <slot name="actions" />
    </div>

    <slot name="afterActions" />
  </div>
</template>
