<script setup lang="ts">
  definePageMeta({
    title: 'page.login.title',
    description: 'page.login.description',
    layout: 'auth',
  });
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <AuthLoginForm />
  </UCard>
</template>
