<script setup lang="ts">
  definePageMeta({
    title: 'page.auth.twoFactorChallenge.title',
    description: 'page.auth.twoFactorChallenge.description',
    middleware: ['guest'],
  });

  const formType: Ref<AuthTwoFactorChallengeType> = ref('code');
</script>

<template>
  <UPage>
    <UPageBody>
      <PageCardGrid>
        <AuthCard :title="$t('page.auth.twoFactorChallenge.authCard.title')">
          <template #description>
            <i18n-t
              :keypath="`page.auth.twoFactorChallenge.authCard.${formType}.description`"
              tag="p"
              class="mt-1 text-gray-500 dark:text-gray-400"
            >
              <BaseLink @click="formType = formType == 'code' ? 'recoveryCode' : 'code'">
                {{
                  $t(
                    `global.action.auth.twoFactorChallenge.switch.${formType == 'code' ? 'recoveryCode' : 'code'}.label`
                  )
                }}
              </BaseLink>
            </i18n-t>
          </template>

          <AuthTwoFactorChallengeForm :type="formType" />
        </AuthCard>
      </PageCardGrid>
    </UPageBody>
  </UPage>
</template>
