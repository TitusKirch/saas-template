<script setup lang="ts">
  definePageMeta({
    title: 'page.logout.title',
    description: 'page.logout.description',
    layout: 'auth',
    middleware: ['auth'],
  });

  const redirectTimeout = ref<NodeJS.Timeout | null>(null);
  const { logout } = useUser();
  onMounted(async () => {
    await logout();

    redirectTimeout.value = setTimeout(() => {
      navigateToLocale({
        name: 'login',
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
        <AuthCard :title="$t('page.logout.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.logout.authCard.description"
              tag="p"
              class="text-gray-500 dark:text-gray-400 mt-1"
            >
              <NuxtLinkLocale
                :to="{
                  name: 'login',
                }"
                class="text-primary-500 font-medium"
                >{{ $t('global.action.login.label') }}</NuxtLinkLocale
              >
            </i18n-t>
          </template>

          <template #header> </template>
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
