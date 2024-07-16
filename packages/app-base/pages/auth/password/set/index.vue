<script setup lang="ts">
  import type { RouteLocationNamedRaw } from 'vue-router';

  definePageMeta({
    title: 'page.auth.password.set.index.title',
    description: 'page.auth.password.set.index.description',
    middleware: ['auth'],
  });

  const { hasPassword } = useCurrentUser();
  if (hasPassword()) {
    throw createError({
      statusCode: 404,
    });
  }

  const route = useRoute();
  const goBackRoute = computed(() => {
    if (route.query?.redirect && (route.query?.redirect as string).startsWith('/')) {
      return route.query.redirect as string;
    }

    return {
      name: 'index',
    } as RouteLocationNamedRaw;
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.password.set.index.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.password.set.index.authCard.description"
              tag="p"
              class="mt-1 text-gray-500 dark:text-gray-400"
            >
              <BaseLink :to="goBackRoute">
                {{ $t('global.action.goBack.label') }}
              </BaseLink>
            </i18n-t>
          </template>

          <AuthSetPasswordForm :go-back-route="goBackRoute" />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
