<script setup lang="ts">
  const teams = [
    {
      label: 'Zuhause',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4',
      },
      click: () => {
        team.value = teams[0];
      },
    },
    {
      label: 'Ferienhaus',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4',
      },
      click: () => {
        team.value = teams[1];
      },
    },
  ];

  const actions = [
    {
      label: 'Create team',
      icon: 'i-fa6-solid-circle-plus',
    },
    {
      label: 'Manage teams',
      icon: 'i-fa6-solid-gear',
    },
  ];

  const team = ref(teams[0]);
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    :items="[teams, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar :src="team.avatar.src" size="2xs" />

      <span class="grow truncate text-left font-semibold text-gray-900 dark:text-white">{{
        team.label
      }}</span>
    </UButton>
  </UDropdown>
</template>
