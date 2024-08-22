<script setup lang="ts">
  const { fetchCurrentUserConfigurations, userConfigurations } = useCurrentUserConfigurations();

  if (!userConfigurations.value) {
    fetchCurrentUserConfigurations();
  }
</script>

<template>
  userConfigurations: {{ userConfigurations }} <br />
  <template v-if="userConfigurations">
    <slot />
  </template>
</template>
