<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.email.verify.title',
    description: 'page.auth.email.verify.description',
    middleware: ['auth'],
  });

  const redirectTimeout = ref<NodeJS.Timeout | null>(null);
  const { emailVerify } = useAuth();
  const { id, hash, expires, signature } = useRoute().query;
  const { execute, status } = emailVerify({
    id: id as string,
    hash: hash as string,
    expires: expires as string,
    signature: signature as string,
  });
  await execute();

  await execute();
  const { refetchMe } = useUser();
  await refetchMe();
  if (status.value === 'success') {
    redirectTimeout.value = setTimeout(() => {
      navigateToLocale({
        name: 'index',
      });
    }, 3000);
  }

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
        <AuthCard
          :title="
            $t(`page.auth.email.verify.authCard.${status == 'success' ? 'success' : 'error'}.title`)
          "
        >
          <template #description>
            <i18n-t
              :keypath="`page.auth.email.verify.authCard.${status == 'success' ? 'success' : 'error'}.description`"
              tag="p"
              class="text-gray-500 dark:text-gray-400 mt-1"
            >
              <NuxtLinkLocale
                :to="{
                  name: 'index',
                }"
                class="text-primary-500 font-medium"
                >{{ $t('global.action.page.home.label') }}</NuxtLinkLocale
              >
            </i18n-t>
          </template>
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
