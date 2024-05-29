<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
    middleware: ['auth'],
  });

  const { me, reset, isAuthenticated } = useUser();

  const resetHandler = () => {
    reset();
  };
  const refetchHandler = async () => {
    await me();
  };
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="$t('page.index.title')" :description="$t('page.index.description')" />
      <UPageBody>
        <PageCardGrid>
          <UCard>
            isAuthenticated {{ isAuthenticated() }}
            <UButton @click="resetHandler" color="red"> Reset </UButton>
            <UButton @click="refetchHandler" color="blue"> Refetch </UButton>
          </UCard>
        </PageCardGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
