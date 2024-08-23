<script setup lang="ts">
  defineSlots<{
    default: HTMLElement;
    pending?: HTMLElement;
  }>();

  const { fetchCurrentUserConfigurations, userConfigurations } = useCurrentUserConfigurations();

  if (!userConfigurations.value) {
    fetchCurrentUserConfigurations();
  }
</script>

<template>
  <template v-if="userConfigurations">
    <slot />
  </template>
  <slot v-else name="pending" />
</template>
