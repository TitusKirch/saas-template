<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.logout.title',
    description: 'page.auth.logout.description',
    middleware: ['auth'],
  });

  const redirectTimeout = ref<NodeJS.Timeout | null>(null);
  const { logout } = useUser();
  onMounted(async () => {
    await logout();

    redirectTimeout.value = setTimeout(() => {
      navigateToLocale({
        name: 'auth-login',
      });
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
        <AuthCard :title="$t('page.auth.logout.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.logout.authCard.description"
              tag="p"
              class="text-gray-500 dark:text-gray-400 mt-1"
            >
              <BaseLink
                :to="{
                  name: 'auth-login',
                }"
              >
                {{ $t('global.action.auth.login.label') }}
              </BaseLink>
            </i18n-t>
          </template>
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
