<script setup lang="ts">
  import type { RouteLocationNamedRaw } from 'vue-router';

  definePageMeta({
    title: 'page.auth.password.set.success.title',
    description: 'page.auth.password.set.success.description',
    middleware: ['auth'],
  });

  const route = useRoute();
  const goBackRoute = computed(() => {
    if (route.query?.redirect && (route.query?.redirect as string).startsWith('/')) {
      return route.query.redirect as string;
    }

    return {
      name: 'index',
    } as RouteLocationNamedRaw;
  });

  const redirectTimeout = ref<NodeJS.Timeout | undefined>();
  onMounted(async () => {
    redirectTimeout.value = setTimeout(() => {
      navigateToLocale(goBackRoute.value);
    }, 3000);
  });
  onBeforeUnmount(() => {
    if (redirectTimeout.value) {
      clearTimeout(redirectTimeout.value);
    }
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.password.set.success.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.password.set.success.authCard.description"
              tag="p"
              class="mt-1 text-gray-500 dark:text-gray-400"
            >
              <BaseLink :to="goBackRoute">
                {{ $t('global.action.goBack.label') }}
              </BaseLink>
            </i18n-t>
          </template>
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
