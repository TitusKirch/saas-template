<script setup lang="ts">
  const { userConfigurationMappedByContextAndKey, userConfigurations } =
    useCurrentUserConfigurations();
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

      <TestTable />
    </UCard>
    <DevCard>
      <DevCode :code="userConfigurations" title="userConfigurations" />
      <DevCode
        :code="userConfigurationMappedByContextAndKey?.table?.test"
        title="userConfigurationMappedByContextAndKey?.table?.test"
      />
    </DevCard>
  </DashboardPageGrid>
</template>
