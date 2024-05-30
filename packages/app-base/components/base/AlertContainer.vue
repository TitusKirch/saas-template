<script setup lang="ts">
  defineSlots<{
    default: HTMLElement[];
  }>();
</script>

<template>
  <UContainer
    :ui="{
      base: 'grid grid-cols-1 gap-4',
    }"
  >
    <slot />
  </UContainer>
</template>

<style scoped>
  div > :deep(:first-child) {
    @apply mt-8;
  }
</style>
