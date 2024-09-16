<script setup lang="ts">
  definePageMeta({
    title: 'page.team.id.edit.meta.title',
    description: 'page.team.id.edit.meta.description',
  });

  const { fetchTeamByRoute, team } = useTeam();
  const { fetchCurrentUser } = useCurrentUser();
  const successCallback = async ({ data }: { data: Ref<TeamsUpdateResponse | null> }) => {
    await fetchCurrentUser();

    await fetchTeamByRoute();

    return navigateToLocale({
      name: 'team-id',
      params: {
        id: data.value?.data.id.toString(),
      },
    });
  };
</script>

<template>
  <DashboardPage
    :title="
      $t('page.team.id.edit.title', {
        teamName: team?.name,
      })
    "
  >
    <UCard>
      <template #header>
        <CardHeader
          :title="$t('page.team.id.edit.section.form.header.title')"
          :description="$t('page.team.id.edit.section.form.header.description')"
        />
      </template>

      <TeamCreateForm mode="update" :team="team" @success="successCallback" />
    </UCard>
  </DashboardPage>
</template>
