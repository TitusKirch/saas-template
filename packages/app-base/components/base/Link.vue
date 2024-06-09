<script setup lang="ts">
  withDefaults(
    defineProps<{
      variant?: 'primary' | 'underline' | 'blank';
    }>(),
    {
      variant: 'primary',
    }
  );
</script>

<template>
  <NuxtLinkLocale
    :class="{
      'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 font-medium hover:underline':
        variant === 'primary',
      'hover:underline': variant === 'underline',
    }"
  >
    <slot
  /></NuxtLinkLocale>
</template>
