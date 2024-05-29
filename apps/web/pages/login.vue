<script setup lang="ts">
  definePageMeta({
    title: 'page.login.title',
    description: 'page.login.description',
    layout: 'auth',
    middleware: ['guest'],
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard>
          <AuthLoginForm />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
