export const useTableStore = defineStore('table', () => {
  // table states
  const tableStates = ref<Record<string, TableState>>({});
  const setTableState = ({ key, state }: { key: string; state: TableState }) => {
    tableStates.value[key] = state;
  };
  const updateTableState = ({ key, state }: { key: string; state: Partial<TableState> }) => {
    tableStates.value[key] = { ...tableStates.value[key], ...state };
  };

  // general
  const reset = () => {
    tableStates.value = {};
  };

  return {
    reset,
    setTableState,
    tableStates,
    updateTableState,
  };
});
