<script setup lang="ts">
  defineSlots<{
    default?: HTMLElement;
  }>();
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <slot />
  </div>
</template>
