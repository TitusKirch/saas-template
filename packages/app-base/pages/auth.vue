<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
    middleware: ['auth-pages-active'],
  });
</script>

<template>
  <NuxtPage />
</template>
