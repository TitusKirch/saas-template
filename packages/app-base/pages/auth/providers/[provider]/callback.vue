<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.provider.provider.callback.title',
    description: 'page.auth.provider.provider.callback.description',
    middleware: ['guest'],
  });

  const { fetchCurrentUser } = useCurrentUser();
  const route = useRoute();
  const { authProviderCallback } = useApiAuth();
  const { execute, status } = authProviderCallback({
    provider: route.params.provider as AuthProvider,
    query: route.query,
    options: {
      immediate: false,
      watch: false,
    },
  });

  onMounted(async () => {
    await execute();

    if (status.value === 'success') {
      return await fetchCurrentUser().finally(async () => {
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
