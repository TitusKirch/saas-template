<script setup lang="ts">
  import { watchArray } from '@vueuse/core';

  const props = withDefaults(
    defineProps<{
      columns: TableColumns;
      configurationKey: string;
      defaultConfiguration?: UserConfigurationValueTable;
      rows?: TableRows;
      rowsPerPageOptions?: number[];
    }>(),
    {
      defaultConfiguration: () => ({}) as UserConfigurationValueTable,
      rows: () => [] as TableRows,
      rowsPerPageOptions: () => [5, 10, 25, 50, 100],
    }
  );

  // table configuration
  const { setUserConfiguration, userConfigurationMappedByContextAndKey, userConfigurations } =
    useCurrentUserConfigurations();
  const tableConfiguration = ref<UserConfigurationValueTable | undefined>();
  if (userConfigurations.value) {
    tableConfiguration.value = {
      ...userConfigurationMappedByContextAndKey.value?.table?.[props.configurationKey]?.value,
    };
  } else {
    tableConfiguration.value = {
      columns: props.columns.map((column) => column.key),
      rowsPerPage: 10,
      sort: {
        column: props.columns[0].key,
        direction: 'asc',
      },
    };
  }
  watch(
    tableConfiguration,
    () => {
      if (tableConfiguration.value) {
        setUserConfiguration({
          configuration: {
            context: 'table',
            key: props.configurationKey,
            value: tableConfiguration.value,
          },
        });
      }
    },
    { deep: true }
  );

  // columns
  const selectedColumns = ref<string[]>(tableConfiguration.value?.columns || []);
  const columnsTable = computed(() => {
    return props.columns.filter((column) => selectedColumns.value.includes(column.key));
  });
  const blockNextTableConfigurationUpdate = ref(false);
  watchArray(selectedColumns, (newList, oldList, added, removed) => {
    if (newList.length === 0) {
      blockNextTableConfigurationUpdate.value = true;
      selectedColumns.value = oldList;
      useNotification({
        type: 'error',
        title: 'base.table.notification.atLeastOneSelectedColumnRequired.title',
        description: 'base.table.notification.atLeastOneSelectedColumnRequired.description',
      });
    }

    if (blockNextTableConfigurationUpdate.value) {
      blockNextTableConfigurationUpdate.value = false;
      return;
    }

    tableConfiguration.value!.columns = newList;
  });
</script>

<template>
  <div v-if="tableConfiguration">
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Rows per page:</span>

        <USelectMenu
          v-model="tableConfiguration.rowsPerPage"
          :options="rowsPerPageOptions"
          class="w-20"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <USelectMenu
          v-model="selectedColumns"
          :options="props.columns"
          value-attribute="key"
          multiple
        >
          <UButton icon="i-fa-solid-columns" color="gray" size="xs"> Columns </UButton>
        </USelectMenu>
      </div>
    </div>

    <UTable :columns="columnsTable" :rows="props.rows" v-model:sort="tableConfiguration.sort">
      <template
        v-for="column in columnsTable"
        :key="column.key"
        v-slot:[`${column.key}-data`]="slotProps"
      >
        <slot v-if="$slots[`${column.key}-data`]" :name="`${column.key}-data`" v-bind="slotProps" />
      </template>
    </UTable>
  </div>
</template>
