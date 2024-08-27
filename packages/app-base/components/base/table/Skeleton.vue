<script setup lang="ts">
  const props = defineProps<{
    columns: TableColumns;
  }>();

  // add 10 empty rows with columns N empty cells
  const rows = computed<TableRows>(() => {
    const result: TableRows = [];
    for (let i = 0; i < 10; i++) {
      const row: TableRow = {};
      props.columns.forEach((column) => {
        row[column.key] = '';
      });
      result.push(row);
    }
    return result;
  });
</script>

<template>
  <BaseTableMain
    :columns="props.columns"
    :rows="rows"
    configuration-key="table-skeleton"
    :skip-user-configuration="true"
    :disable-options="true"
  >
    <template v-for="column in columns" :key="column.key" v-slot:[`${column.key}-data`]="{ row }">
      <USkeleton class="w-full h-5" />
    </template>
  </BaseTableMain>
</template>
