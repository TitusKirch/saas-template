<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.password.reset.success.title',
    description: 'page.auth.password.reset.success.description',
    middleware: ['guest'],
  });

  const redirectTimeout = ref<NodeJS.Timeout | null>(null);
  onMounted(async () => {
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
        <AuthCard :title="$t('page.auth.password.reset.success.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.password.reset.success.authCard.description"
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
