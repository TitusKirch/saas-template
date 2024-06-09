<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });
</script>

<template>
  <DashboardPage :title="$t('page.index.title')" />
</template>
