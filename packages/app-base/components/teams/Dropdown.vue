<script setup lang="ts">
  const props = defineProps<{
    teams?: Team[];
  }>();

  const currentTeam = ref<Team | undefined>(props.teams ? props.teams[0] : undefined);

  // const teams = [
  //   {
  //     label: 'Zuhause',
  //     avatar: {
  //       src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4',
  //     },
  //     click: () => {
  //       team.value = teams[0];
  //     },
  //   },
  //   {
  //     label: 'Ferienhaus',
  //     avatar: {
  //       src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4',
  //     },
  //     click: () => {
  //       team.value = teams[1];
  //     },
  //   },
  // ];

  const dropdownTeams = computed(() => {
    if (!props.teams) {
      return [];
    }

    return props.teams.map((team) => {
      return {
        label: team.name,
        avatar: {
          alt: team.name,
          // src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4',
        },
        disabled: team === currentTeam.value,
        click: () => {
          currentTeam.value = team;
        },
      };
    });
  });

  watch(
    () => currentTeam.value,
    (team) => {
      if (!team) {
        return;
      }

      navigateToLocale({
        name: 'team-id',
        params: {
          id: team.id.toString(),
        },
      });
    }
  );

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
      v-if="currentTeam"
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar :alt="currentTeam.name" size="2xs" />

      <span class="grow truncate text-left font-semibold text-gray-900 dark:text-white">
        {{ currentTeam.name }}
      </span>
    </UButton>
  </UDropdown>
</template>
