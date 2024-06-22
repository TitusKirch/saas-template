<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.email.verify.title',
    description: 'page.auth.email.verify.description',
    middleware: ['auth'],
  });

  const { emailVerify } = useAuth();
  const { id, hash, expires, signature } = useRoute().query;
  const path: Ref<AuthEmailVerifyPath> = ref({
    id: id as string,
    hash: hash as string,
  });
  const params: Ref<AuthEmailVerifyParams> = ref({
    expires: expires as string,
    signature: signature as string,
  });
  const { execute, status } = emailVerify({
    path,
    params,
  });
  await execute();

  const redirectTimeout = ref<NodeJS.Timeout | null>(null);
  if (status.value === 'success') {
    redirectTimeout.value = setTimeout(async () => {
      const { refetchMe } = useUser();
      return await refetchMe().finally(() => {
        return navigateToLocale({
          name: 'index',
        });
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
        <AuthCard :title="$t(`page.auth.email.verify.authCard.${status}.title`)">
          <template #description>
            <i18n-t
              :keypath="`page.auth.email.verify.authCard.${status}.description`"
              tag="p"
              class="mt-1 text-gray-500 dark:text-gray-400"
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
