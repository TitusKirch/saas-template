<script setup lang="ts">
  const {
    fetchCurrentUserConfigurations,
    setUserConfigurations,
    userConfigurationMappedByContextAndKey,
  } = useCurrentUserConfigurations();

  await fetchCurrentUserConfigurations();

  const test = ref(1);
  const clickHandler = () => {
    test.value += 1;
    setUserConfigurations({
      configurations: [
        {
          context: 'table',
          key: 'test',
          value: {
            columns: [
              { key: 'name', label: 'Name' },
              { key: 'age', label: `Age ${test.value}` },
            ],
          },
        },
      ],
    });
  };
</script>

<template>
  <DashboardPageGrid>
    <UCard>
      <template #header>
        <CardHeader
          :title="$t('page.settings.configurations.section.tables.title')"
          :description="$t('page.settings.configurations.section.tables.description')"
        />
      </template>

      <UButton @click="clickHandler">Click me</UButton>

      <TestTable />
    </UCard>
    <DevCard>
      <DevCode
        :code="userConfigurationMappedByContextAndKey?.table?.test"
        title="userConfigurationMappedByContextAndKey?.table?.test"
      />
    </DevCard>
  </DashboardPageGrid>
</template>
