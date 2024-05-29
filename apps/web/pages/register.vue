<script setup lang="ts">
  definePageMeta({
    title: 'page.register.title',
    description: 'page.register.description',
    layout: 'auth',
    middleware: ['guest'],
  });

  const { me } = useUser();
  const user = await me();
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard>
          <AuthRegisterForm />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
