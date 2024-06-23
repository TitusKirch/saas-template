<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.provider.provider.callback.title',
    description: 'page.auth.provider.provider.callback.description',
    middleware: ['guest'],
  });

  const route = useRoute();
  const { authProviderCallback } = useAuth();
  const { execute, data, status } = authProviderCallback({
    provider: route.params.provider as AuthProvider,
    query: route.query,
  });

  onMounted(async () => {
    await execute();

    if (status.value === 'success') {
      const { refetchMe } = useUser();
      return await refetchMe().finally(async () => {
        return navigateToLocale({
          name: 'index',
        });
      });
    }
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.provider.provider.callback.authCard.title')">
          <template #description>
            {{ $t('page.auth.provider.provider.callback.authCard.description') }}
          </template>
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
