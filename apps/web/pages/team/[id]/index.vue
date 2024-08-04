<script setup lang="ts">
  const { team } = useTeam();

  useHead({
    title: team.value?.name,
  });

  const clickHandler = () => {
    navigateToLocale({
      name: 'team-id-edit',
      params: {
        id: team.value?.id.toString(),
      },
    });
  };
</script>

<template>
  <DashboardPage
    v-if="team"
    :title="
      $t('page.team.id.index.title', {
        teamName: team?.name,
      })
    "
  >
    <UCard>
      <template #header>
        <CardHeader
          :title="team.name"
          :description="team?.description"
          :ui="{
            wrapper: 'mb-0',
            base: 'gap-4 lg:gap-8',
            description: 'line-clamp-2 lg:line-clamp-3',
          }"
        >
          <template #beforeTitle>
            <UAvatar :alt="team?.name" size="2xl" class="lg:hidden" />
            <UAvatar :alt="team?.name" size="3xl" class="hidden lg:flex" />
          </template>
        </CardHeader>
      </template>
    </UCard>

    <UButton @click="clickHandler" class="mt-64">Click me</UButton>
  </DashboardPage>
</template>
