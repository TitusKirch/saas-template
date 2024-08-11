import { useTeamStore } from '@tituskirch/app-base/stores/team';

export default function () {
  const teamStore = useTeamStore();
  const teamStoreRefs = storeToRefs(teamStore);

  // team
  const route = useRoute();
  const { getTeam } = useApiTeams();
  const {
    data: fetchTeamByRouteData,
    status: fetchTeamByRouteStatus,
    execute: fetchTeamByRoute,
    error: fetchTeamByRouteError,
  } = getTeam({
    id: BigInt((route.params?.id as string) ?? 0),
    options: {
      immediate: false,
      watch: false,
    },
  });
  watch(fetchTeamByRouteData, (value) => {
    if (value) {
      teamStore.setTeam({
        team: value.data,
      });
    }
  });

  // permissions
  enum PermissionsEnum {
    UPDATE_TEAM = 'update team',
    DELETE_TEAM = 'delete team',
    RESTORE_TEAM = 'restore team',
    FORCE_DELETE_TEAM = 'force delete team',
  }
  type Permissions = keyof typeof PermissionsEnum;
  const permissions = (): Permissions[] => {
    return Object.keys(PermissionsEnum) as Permissions[];
  };

  return {
    ...teamStore,
    ...teamStoreRefs,
    fetchTeamByRoute,
    fetchTeamByRouteData,
    fetchTeamByRouteError,
    fetchTeamByRouteStatus,
    permissions,
    PermissionsEnum,
  };
}
