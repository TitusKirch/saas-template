<script setup lang="ts">
  const { userConfigurationMappedByContextAndKey, userConfigurations } =
    useCurrentUserConfigurations();

  // table configuration
  const columns: TableColumns = [
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
  const query = ref('');
  const rowsPerPage = ref(10);
  const page = ref(1);
  const sort = ref<string | undefined>();
  const order = ref<TableColumnSortDirection>('asc');
  const updateCurrentPage = ({ currentPage }: { currentPage: number }) => {
    page.value = currentPage;
  };
  const updateRowsPerPage = ({ rowsPerPage: newRowsPerPage }: { rowsPerPage: number }) => {
    rowsPerPage.value = newRowsPerPage;
  };
  watch(
    () =>
      userConfigurationMappedByContextAndKey.value?.table?.[
        'page-settings-configurations-section-tables'
      ]?.value?.sort,
    (value) => {
      if (value) {
        sort.value = value.column;
        order.value = value.direction ?? 'asc';
      }
    },
    { deep: true }
  );

  // actions
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

  // data
  const { getCurrentUserConfigurations } = useApiUsersMe();
  const {
    data: fetchCurrentUserConfigurationsData,
    error: fetchCurrentUserConfigurationsError,
    execute: fetchCurrentUserConfigurations,
    status: fetchCurrentUserConfigurationsStatus,
  } = getCurrentUserConfigurations({
    options: {
      query: {
        limit: rowsPerPage,
        page,
        query,
        sort,
        order,
      },
      immediate: false,
      lazy: true,
    },
  });

  onMounted(async () => {
    await fetchCurrentUserConfigurations();
  });

  const rows = computed<TableRows>(() => {
    const result: TableRows = [];

    for (const userConfiguration of fetchCurrentUserConfigurationsData.value?.data || []) {
      result.push({
        id: userConfiguration.id,
        key: userConfiguration.key,
        updated_at: new Date(userConfiguration.updated_at).toLocaleString(),
        created_at: new Date(userConfiguration.created_at).toLocaleString(),
      });
    }

    return result;
  });
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

      <BaseTable
        configuration-key="page-settings-configurations-section-tables"
        :rows="rows"
        :columns="columns"
        :rows-per-page="rowsPerPage"
        :pagination-meta="fetchCurrentUserConfigurationsData?.meta"
        :loading="fetchCurrentUserConfigurationsStatus === 'pending'"
        @update:currentPage="updateCurrentPage"
        @update:rowsPerPage="updateRowsPerPage"
      >
        <template #beforeActions>
          <UInput
            v-model="query"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search..."
          />
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-fa-solid-ellipsis-h" />
          </UDropdown>
        </template>
      </BaseTable>
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
