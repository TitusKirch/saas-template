<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
  });

  // register
  const { transformRegisterFormToData, register } = useAuth();
  const { data, error, pending, execute } = await register({
    data: transformRegisterFormToData({
      form: {
        email: 'test@example.com',
        password: 'password',
        password_confirm: 'password',
      },
    }),
  });
  const clickHandler = async () => {
    await execute();
  };
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="$t('page.index.title')" :description="$t('page.index.description')" />
      <UPageBody>
        <PageCardGrid>
          <UCard>
            <UButton @click="clickHandler">Register</UButton>
          </UCard>
          <DevCard>
            <DevCode title="pending" :code="pending" />
            <DevCode title="data" :code="data" />
            <DevCode title="error" :code="error" />
            <DevCode title="error?.data?.errors" :code="error?.data?.errors" />
          </DevCard>
        </PageCardGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
