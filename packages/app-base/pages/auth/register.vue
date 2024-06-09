<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.register.title',
    description: 'page.auth.register.description',
    middleware: ['guest'],
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.register.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.auth.register.authCard.description"
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

          <AuthRegisterForm />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
