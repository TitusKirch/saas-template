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
  <DashboardPage :title="$t('page.team.create.title')">
    <TeamCreateForm @success="successCallback" />
  </DashboardPage>
</template>
