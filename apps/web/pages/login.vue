<script setup lang="ts">
  definePageMeta({
    title: 'page.login.title',
    description: 'page.login.description',
    layout: 'auth',
    middleware: ['guest'],
  });
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.login.authCard.title')">
          <template #description>
            <i18n-t
              keypath="page.login.authCard.description"
              tag="p"
              class="text-gray-500 dark:text-gray-400 mt-1"
            >
              <NuxtLinkLocale
                :to="{
                  name: 'register',
                }"
                class="text-primary-500 font-medium"
                >{{ $t('global.action.register.label') }}</NuxtLinkLocale
              >
            </i18n-t>
          </template>

          <AuthLoginForm />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
