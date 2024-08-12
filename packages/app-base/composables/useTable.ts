import { useTableStore } from '@tituskirch/app-base/stores/table';

export default function () {
  const tableStore = useTableStore();
  const tableStoreRefs = storeToRefs(tableStore);

  // team
  return {
    ...tableStore,
    ...tableStoreRefs,
  };
}
