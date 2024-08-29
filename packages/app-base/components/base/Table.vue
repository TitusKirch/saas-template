<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      columns: TableColumns;
      configurationKey: string;
      defaultConfiguration?: UserConfigurationValueTable;
      disableOptions?: boolean;
      rows?: TableRows;
      rowsPerPage?: number;
      rowsPerPageOptions?: number[];
      skipUserConfiguration?: boolean;
    }>(),
    {
      defaultConfiguration: () => ({}) as UserConfigurationValueTable,
      disableOptions: false,
      rows: () => [] as TableRows,
      rowsPerPage: 10,
      rowsPerPageOptions: () => [5, 10, 25, 50, 100],
      skipUserConfiguration: false,
    }
  );
  const emits = defineEmits<{
    'update:rowsPerPage': [
      {
        rowsPerPage: number;
      },
    ];
  }>();

  // pass emits
  const updateRowsPerPage = ({ rowsPerPage }: { rowsPerPage: number }) => {
    emits('update:rowsPerPage', { rowsPerPage });
  };
</script>

<template>
  <UserMeConfigurationsRequired>
    <BaseTableMain v-bind="props" @update:rowsPerPage="updateRowsPerPage">
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

    <template #pending>
      <BaseTableSkeleton :columns="columns" />
    </template>
  </UserMeConfigurationsRequired>
</template>
