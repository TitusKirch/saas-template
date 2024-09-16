<script setup lang="ts">
  const { team } = useTeam();

  useHead({
    title: team.value?.name,
  });
</script>

<template>
  <DashboardPage v-if="team" :title="$t('page.team.id.roles.title')">
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
    <UCard>
      <TestTable v-for="i in 2" :key="i" :id="i + 200" />
    </UCard>
  </DashboardPage>
</template>
