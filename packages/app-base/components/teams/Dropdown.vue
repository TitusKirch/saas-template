<script setup lang="ts">
  const props = defineProps<{
    team?: Team;
    teams: Team[];
  }>();
  const emit = defineEmits<{
    change: [{ team: Team }];
  }>();

  const selectedTeam = ref<Team | undefined>(props.team);
  watch(
    () => props.team,
    (value) => {
      if (!value) {
        return;
      }

      selectedTeam.value = value;
    }
  );

  const dropdownTeams = computed(() => {
    return props.teams.map((team) => {
      return {
        label: team.name,
        avatar: {
          alt: team.name,
          // src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4',
        },
        disabled: team.id == selectedTeam.value?.id,
        click: () => {
          emit('change', {
            team,
          });
        },
      };
    });
  });

  const actions = [
    {
      label: 'Create team',
      icon: 'i-fa6-solid-circle-plus',
      click: () => {
        navigateToLocale({
          name: 'team-create',
        });
      },
    },
    {
      label: 'Manage teams',
      icon: 'i-fa6-solid-gear',
    },
  ];
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    :items="[dropdownTeams, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      v-if="selectedTeam"
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar :alt="selectedTeam.name" size="2xs" />

      <span class="grow truncate text-left font-semibold text-gray-900 dark:text-white">
        {{ selectedTeam.name }}
      </span>
    </UButton>
  </UDropdown>
</template>
