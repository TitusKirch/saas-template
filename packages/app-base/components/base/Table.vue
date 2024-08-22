<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      columns: TableColumns;
      rows?: TableRows;
      configurationKey: string;
      defaultConfiguration?: UserConfigurationValueTable;
    }>(),
    {
      rows: () => [] as TableRows,
      defaultConfiguration: () => ({}) as UserConfigurationValueTable,
    }
  );

  const { setUserConfiguration, userConfigurationMappedByContextAndKey, userConfigurations } =
    useCurrentUserConfigurations();

  // table states
  // const selectedColumns = ref<string[]>([]);
  // const rowsPerPage = ref(10);
  const rowsPerPageOptions = ref([5, 10, 25, 50, 100]);
  // const sort = ref<UserConfigurationValueTable['sort']>({
  //   column: props.columns[0].key,
  //   direction: 'asc',
  // });

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

  const columnsTable = computed(() => {
    return props.columns.filter((column) =>
      tableConfiguration.value?.columns
        ? tableConfiguration.value.columns.includes(column.key)
        : true
    );
  });

  // initial table configuration
  // const initialTableConfiguration: UserConfigurationPartial = {
  //   context: 'table',
  //   key: props.configurationKey,
  //   value: Object.keys(props.defaultConfiguration).length
  //     ? props.defaultConfiguration
  //     : {
  //         columns: props.columns.map((column) => column.key),
  //         rowsPerPage: 10,
  //         sort: {
  //           column: props.columns[0].key,
  //           direction: 'asc',
  //         },
  //       },
  // };

  // table configuration
  // const tableConfiguration = ref<UserConfigurationPartial>(
  //   userConfigurationMappedByContextAndKey.value?.table?.[props.configurationKey]
  //     ? {
  //         ...userConfigurationMappedByContextAndKey.value.table[props.configurationKey],
  //       }
  //     : {
  //         ...initialTableConfiguration,
  //       }
  // );
  // watch(selectedColumns, (value) => {
  //   tableConfiguration.value['value']['columns'] = value;
  // });
  // watch(rowsPerPage, (value) => {
  //   tableConfiguration.value['value']['rowsPerPage'] = value;
  // });
  // watch(sort, (value) => {
  //   tableConfiguration.value['value']['sort'] = value;
  // });

  // watch(
  //   tableConfiguration,
  //   () => {
  //     setUserConfiguration({
  //       configuration: tableConfiguration.value,
  //     });
  //   },
  //   { deep: true }
  // );
  // initailize table
  const initailizeTable = () => {
    // if (!props.configurationKey) {
    //   throw new Error('Table require configurationKey prop');
    // }
    // // check if configuration exists
    // // console.info('============================================');
    // // console.info('============================================');
    // // console.info('============================================');
    // // console.info(
    // //   'userConfigurationMappedByContextAndKey',
    // //   userConfigurationMappedByContextAndKey.value
    // // );
    // if (!userConfigurationMappedByContextAndKey?.value?.table?.[props.configurationKey]) {
    //   console.info('addUserConfiguration', initialTableConfiguration);
    //   setUserConfiguration({
    //     configuration: initialTableConfiguration,
    //   });
    // }
    // if (!userConfigurationMappedByContextAndKey?.value?.table?.[props.configurationKey]?.value) {
    //   throw new Error('Failed to initialize table configuration');
    // }
    // selectedColumns.value =
    //   userConfigurationMappedByContextAndKey.value.table[props.configurationKey].value.columns ||
    //   props.columns.map((column) => column.key);
    // rowsPerPage.value =
    //   userConfigurationMappedByContextAndKey.value.table[props.configurationKey].value
    //     .rowsPerPage || 10;
    // sort.value =
    //   userConfigurationMappedByContextAndKey.value.table[props.configurationKey].value.sort;
  };
  // onMounted(() => {
  //   initailizeTable();
  // });
  // watch(
  //   userConfigurations,
  //   () => {
  //     initailizeTable();
  //   },
  //   { immediate: true }
  // );
</script>

<template>
  <br />
  tableConfiguration: {{ tableConfiguration }} <br />
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
          v-model="tableConfiguration.columns"
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
