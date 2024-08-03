import { useTeamStore } from '@tituskirch/app-base/stores/team';

export default function () {
  const teamStore = useTeamStore();
  const teamStoreRefs = storeToRefs(teamStore);

  return {
    ...teamStore,
    ...teamStoreRefs,
  };
}
