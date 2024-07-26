<script setup lang="ts">
  useHead({
    bodyAttrs: {
      class: 'dark:bg-gray-950',
    },
  });
</script>

<template>
  <div class="h-screen">
    <UMain
      :ui="{
        wrapper: 'flex items-center justify-center',
      }"
    >
      <div class="w-full max-w-xl">
        <slot />
      </div>
    </UMain>
  </div>
</template>
