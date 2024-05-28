<script setup lang="ts">
  definePageMeta({
    title: 'page.register.title',
    description: 'page.register.description',
    layout: 'auth',
  });

  const { me } = useUser();
  const user = await me();
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="w-80 p-4 bg-white text-black">
      {{ user }}
    </div>

    <AuthRegisterForm />
  </UCard>
</template>
