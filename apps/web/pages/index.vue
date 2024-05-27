<script setup lang="ts">
  definePageMeta({
    title: 'page.index.title',
    description: 'page.index.description',
  });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="$t('page.index.title')" :description="$t('page.index.description')" />
      <UPageBody>
        <PageCardGrid>
          <UCard>
            <!-- <UButton @click="clickHandler">Register</UButton> -->
          </UCard>
        </PageCardGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
