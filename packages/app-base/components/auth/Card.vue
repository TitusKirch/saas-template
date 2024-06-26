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
  <UCard class="bg-white/75 backdrop-blur dark:bg-white/5">
    <div class="space-y-6">
      <div v-if="title || $slots.description" class="text-center">
        <div class="pointer-events-none mb-2">
          <UIcon
            name="i-fa6-solid-fire"
            class="text-primary-500 dark:text-primary-400 size-8 shrink-0"
          />
        </div>
        <p v-if="title" class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ title }}
        </p>

        <slot name="description" />
      </div>

      <slot />
    </div>
  </UCard>
</template>
