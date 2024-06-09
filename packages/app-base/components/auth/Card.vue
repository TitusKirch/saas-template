<script setup lang="ts">
  withDefaults(
    defineProps<{
      title?: string;
    }>(),
    {
      title: '',
    }
  );
  defineSlots<{
    description?: HTMLElement;
    default?: HTMLElement;
  }>();
</script>

<template>
  <UCard class="bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="space-y-6">
      <div v-if="title || $slots.description" class="text-center">
        <div class="mb-2 pointer-events-none">
          <UIcon
            name="i-fa6-solid-fire"
            class="w-8 h-8 flex-shrink-0 text-primary-500 dark:text-primary-400"
          />
        </div>
        <p v-if="title" class="text-2xl text-gray-900 dark:text-white font-bold">
          {{ title }}
        </p>

        <slot name="description" />
      </div>

      <slot />
    </div>
  </UCard>
</template>
