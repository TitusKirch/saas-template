export const useTableStore = defineStore(
  'table',
  () => {
    // table states
    const tableStates = ref<Record<string, TableState>>({});
    const setTableState = ({ key, state }: { key: string; state: TableState }) => {
      tableStates.value[key] = state;
    };
    const updateTableState = ({ key, state }: { key: string; state: Partial<TableState> }) => {
      tableStates.value[key] = { ...tableStates.value[key], ...state };
    };
    // timestamp to force an update every time the store is loaded (so the cookie expire time is updated)
    const timestamp = ref(Date.now());
    watch(tableStates, () => {
      timestamp.value = Date.now();
    });
    const route = useRoute();
    watch(
      () => route.fullPath,
      () => {
        timestamp.value = Date.now();
      }
    );

    // general
    const reset = () => {
      tableStates.value = {};
      timestamp.value = Date.now();
    };

    return {
      timestamp,
      reset,
      setTableState,
      tableStates,
      updateTableState,
    };
  },
  {
    persist: {
      paths: ['tableStates', 'timestamp'],
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      }),
    },
  }
);
