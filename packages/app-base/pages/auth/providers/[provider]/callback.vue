<script setup lang="ts">
  import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

  definePageMeta({
    title: 'page.auth.provider.provider.callback.title',
    description: 'page.auth.provider.provider.callback.description',
    middleware: ['guest'],
  });

  const currentUserStore = useCurrentUserStore();
  const route = useRoute();
  const { authProviderCallback } = useAuth();
  const { execute, status } = authProviderCallback({
    provider: route.params.provider as AuthProvider,
    query: route.query,
  });

  onMounted(async () => {
    await execute();

    if (status.value === 'success') {
      return await currentUserStore.refetchUser().finally(async () => {
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
