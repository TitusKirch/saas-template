<script setup lang="ts">
  const props = defineProps<{
    id: string;
    columns: TableColumns;
    defaultState?: TableState;
  }>();

  const { timestamp, tableStates, setTableState, updateTableState } = useTable();

  const initTable = () => {
    console.log('initTable', props);
    if (!props.id) {
      console.error('Table id is required');
      return;
    }
    if (!tableStates.value[props.id]) {
      setTableState({
        id: props.id,
        state: props?.defaultState ?? {},
      });
    }
  };
  initTable();
</script>

<template>
  <UTable />
</template>
