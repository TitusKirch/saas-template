<script setup lang="ts">
  const { userConfigurationMappedByContextAndKey, userConfigurations } =
    useCurrentUserConfigurations();

  const columns: TableColumns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
    },
    {
      key: 'key',
      label: 'key',
      sortable: true,
    },
    {
      key: 'updated_at',
      label: 'updated_at',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'created_at',
      sortable: true,
    },
    {
      label: 'actions',
      key: 'actions',
    },
  ];

  const rows = computed<TableRows>(() => {
    const result: TableRows = [];

    for (const key in userConfigurationMappedByContextAndKey.value?.table || {}) {
      const configuration = userConfigurationMappedByContextAndKey.value?.table?.[key];

      if (!configuration) {
        continue;
      }

      result.push({
        id: (configuration as UserConfiguration).id || '',
        key: configuration.key,
        updated_at: (configuration as UserConfiguration).updated_at
          ? new Date((configuration as UserConfiguration).updated_at).toLocaleString()
          : '',
        created_at: (configuration as UserConfiguration).created_at
          ? new Date((configuration as UserConfiguration).created_at).toLocaleString()
          : '',
      });
    }

    return result;
  });

  const { t } = useI18n();
  const items = (row: TableRow) => [
    [
      {
        label: t('action.view.label'),
        icon: 'i-fa-solid-eye',
        disabled: true,
      },
      {
        label: t('action.copyToClipboard.label'),
        icon: 'i-fa-solid-copy',
        disabled: true,
      },
      {
        label: t('action.export.label'),
        icon: 'i-fa-solid-file-export',
        disabled: true,
      },
    ],
    [
      {
        label: t('action.delete.label'),
        icon: 'i-fa-solid-trash',
      },
    ],
  ];
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

      <UserMeConfigurationsRequired>
        <BaseTable
          configuration-key="page-settings-configurations-section-tables"
          :rows="rows"
          :columns="columns"
        >
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" variant="ghost" icon="i-fa-solid-ellipsis-h" />
            </UDropdown>
          </template>
        </BaseTable>
      </UserMeConfigurationsRequired>
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
