<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      columns: TableColumns;
      configurationKey: string;
      defaultConfiguration?: UserConfigurationValueTable;
      disableOptions?: boolean;
      loading?: boolean;
      rows?: TableRows;
      rowsPerPage?: number;
      rowsPerPageOptions?: number[];
      skipLoadingAnimation?: boolean;
      skipUserConfiguration?: boolean;
      paginationMeta?: ApiResourceResponseMeta;
    }>(),
    {
      defaultConfiguration: () => ({}) as UserConfigurationValueTable,
      disableOptions: false,
      loading: false,
      rows: () => [] as TableRows,
      rowsPerPage: 10,
      rowsPerPageOptions: () => [5, 10, 25, 50, 100],
      skipUserConfiguration: false,
      skipLoadingAnimation: false,
    }
  );
  const emits = defineEmits<{
    'update:currentPage': [
      {
        currentPage: number;
      },
    ];
    'update:rowsPerPage': [
      {
        rowsPerPage: number;
      },
    ];
  }>();

  // pass emits
  const updateCurrentPage = ({ currentPage }: { currentPage: number }) => {
    emits('update:currentPage', { currentPage });
  };
  const updateRowsPerPage = ({ rowsPerPage }: { rowsPerPage: number }) => {
    emits('update:rowsPerPage', { rowsPerPage });
  };

  // first load
  const tableLoadOnce = ref(props.skipLoadingAnimation ? true : false);
  watch(
    () => props.loading,
    (newValue, oldValue) => {
      if (newValue === false && oldValue === true && !tableLoadOnce.value) {
        tableLoadOnce.value = true;
      }
    }
  );
</script>

<template>
  <UserMeConfigurationsRequired>
    <BaseTableMain
      v-if="tableLoadOnce"
      v-bind="props"
      @update:currentPage="updateCurrentPage"
      @update:rowsPerPage="updateRowsPerPage"
    >
      <template v-if="$slots.beforeActions" #beforeActions>
        <slot name="beforeActions" />
      </template>

      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>

      <template
        v-for="column in columns"
        :key="column.key"
        v-slot:[`${column.key}-data`]="slotProps"
      >
        <slot v-if="$slots[`${column.key}-data`]" :name="`${column.key}-data`" v-bind="slotProps" />
      </template>
    </BaseTableMain>
    <BaseTableSkeleton v-else :columns="columns" :configuration-key="configurationKey" />

    <template #pending>
      <BaseTableSkeleton :columns="columns" />
    </template>
  </UserMeConfigurationsRequired>
</template>
