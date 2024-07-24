<script setup lang="ts">
  // const NuxtImg = resolveComponent('NuxtImg')
  //  :as="NuxtImg"

  defineProps<{
    user?: User;
    src?: string;
    loading?: boolean;
  }>();
</script>

<template>
  <UAvatar v-if="!loading" :src="src" :alt="`${user?.first_name} ${user?.last_name}`" />
  <USkeleton v-else :ui="{ rounded: 'rounded-full' }" class="h-12 w-12" />
</template>
