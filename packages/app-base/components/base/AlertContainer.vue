<script setup lang="ts">
  defineSlots<{
    default: HTMLElement[];
  }>();
</script>

<template>
  <UContainer
    :ui="{
      base: 'grid grid-cols-1 gap-4 w-full !p-0 !max-w-none',
    }"
  >
    <slot />
  </UContainer>
</template>
