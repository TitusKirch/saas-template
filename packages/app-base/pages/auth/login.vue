<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.login.title',
    description: 'page.auth.login.description',
    middleware: ['guest'],
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.login.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.login.authCard.description"
              tag="p"
              class="text-gray-500 dark:text-gray-400 mt-1"
            >
              <BaseLink
                :to="{
                  name: 'auth-register',
                }"
              >
                {{ $t('global.action.auth.register.label') }}
              </BaseLink>
            </i18n-t>
          </template>

          <AuthLoginForm />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
