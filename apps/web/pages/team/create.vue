<script setup lang="ts">
  definePageMeta({
    title: 'page.team.create.title',
    description: 'page.team.create.description',
  });

  const { fetchCurrentUser } = useCurrentUser();
  const successCallback = async ({ data }: { data: Ref<TeamsUpdateResponse | null> }) => {
    await fetchCurrentUser();

    return navigateToLocale({
      name: 'team-id',
      params: {
        id: data.value?.data.id.toString(),
      },
    });
  };
</script>

<template>
  <DashboardPage :title="$t('page.team.id.create.title')">
    <UCard>
      <template #header>
        <CardHeader
          :title="$t('page.team.create.section.form.header.title')"
          :description="$t('page.team.create.section.form.header.description')"
        />
      </template>

      <TeamCreateForm @success="successCallback" />
    </UCard>
  </DashboardPage>
</template>
