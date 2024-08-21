<script setup lang="ts">
  const columns: TableColumns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
    },
    {
      label: 'Actions',
      key: 'actions',
    },
  ];

  const people = [
    {
      id: 1,
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      email: 'lindsay.walton@example.com',
      role: 'Member',
    },
    {
      id: 2,
      name: 'Courtney Henry',
      title: 'Designer',
      email: 'courtney.henry@example.com',
      role: 'Admin',
    },
    {
      id: 3,
      name: 'Tom Cook',
      title: 'Director of Product',
      email: 'tom.cook@example.com',
      role: 'Member',
    },
    {
      id: 4,
      name: 'Whitney Francis',
      title: 'Copywriter',
      email: 'whitney.francis@example.com',
      role: 'Admin',
    },
    {
      id: 5,
      name: 'Leonard Krasner',
      title: 'Senior Designer',
      email: 'leonard.krasner@example.com',
      role: 'Owner',
    },
    {
      id: 6,
      name: 'Floyd Miles',
      title: 'Principal Designer',
      email: 'floyd.miles@example.com',
      role: 'Member',
    },
  ];

  const items = (row) => [
    [
      {
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id),
      },
      {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid',
      },
    ],
    [
      {
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid',
      },
      {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
      },
    ],
    [
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
      },
    ],
  ];

  const selected = ref([people[1]]);
</script>

<template>
  <UserMeConfigurationsRequired>
    <BaseTable configuration-key="test" :rows="people" :columns="columns">
      <template #name-data="{ row }">
        <span
          :class="[
            selected.find((person) => person.id === row.id) &&
              'text-primary-500 dark:text-primary-400',
          ]"
        >
          {{ row.name }}
        </span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-fa-solid-ellipsis-h" />
        </UDropdown>
      </template>
    </BaseTable>
  </UserMeConfigurationsRequired>
</template>
