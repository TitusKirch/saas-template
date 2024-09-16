export const useTeamStore = defineStore('team', () => {
  const team = ref<Team | undefined>();
  const setTeam = ({ team: newTeam }: { team: Team }) => {
    team.value = newTeam;
  };
  const reset = () => {
    team.value = undefined;
  };

  return {
    reset,
    setTeam,
    team,
  };
});
