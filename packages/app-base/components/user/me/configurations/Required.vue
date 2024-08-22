<script setup lang="ts">
  const { fetchCurrentUserConfigurations, userConfigurations } = useCurrentUserConfigurations();

  if (!userConfigurations.value) {
    fetchCurrentUserConfigurations();
  }
</script>

<template>
  <template v-if="userConfigurations">
    <slot />
  </template>
</template>
