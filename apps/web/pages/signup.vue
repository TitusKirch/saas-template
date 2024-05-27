<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
    layout: 'auth',
  });
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <AuthRegisterForm />
  </UCard>
</template>
