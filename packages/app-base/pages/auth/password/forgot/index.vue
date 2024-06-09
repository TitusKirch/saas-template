<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.password.forgot.index.title',
    description: 'page.auth.password.forgot.index.description',
    middleware: ['guest'],
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.password.forgot.index.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.password.forgot.index.authCard.description"
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

          <AuthForgotPasswordForm />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
