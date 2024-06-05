<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
    layout: 'dashboard',
    middleware: ['auth'],
  });
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Placeholder"> </UDashboardNavbar>
    </UDashboardPanel>
  </UDashboardPage>
</template>
