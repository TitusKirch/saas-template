<script setup lang="ts">
  import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';

  // init dashboard
  const {
    resetSidebarLinks,
    addSidebarLinks,
    getSidebarLinks,
    resetSearchGroups,
    addSearchGroup,
    getSearchGroupsWithLinks,
    resetShortcuts,
    addShortcut,
  } = useDashboard();

  const dashboardStore = useDashboardStore();
  const { t } = useI18n();
  const localePath = useLocalePath();
  const { currentUser } = useCurrentUser();
  const { team, setTeam } = useTeam();

  onMounted(() => {
    // sidebar links
    resetSidebarLinks();
    addSidebarLinks([
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'i-fa6-solid-house',
        to: localePath({
          name: 'index',
        }),
        tooltip: {
          text: 'Dashboard',
          shortcuts: ['G', 'D'],
        },
      },
      {
        id: 'placeholder',
        label: 'Placeholder',
        icon: 'i-fa6-solid-flask',
        to: localePath({
          name: 'placeholder',
        }),
        tooltip: {
          text: 'Placeholder',
          shortcuts: ['G', 'P'],
        },
      },
      {
        id: 'team-id',
        label: computed(() => team.value?.name),
        icon: 'i-fa6-solid-users',
        to: computed(() => {
          console.log('team.value?.id', team.value?.id);
          return localePath({
            name: 'team-id',
            params: {
              id: team.value?.id.toString(),
            },
          });
        }),
      },
    ]);

    // search groups
    resetSearchGroups();
    addSearchGroup({
      key: 'settings',
      label: t('page.settings.title'),
      commands: [
        {
          id: 'settings-index',
          label: t('page.settings.index.title'),
          icon: 'i-fa6-solid-gears',
          to: localePath({ name: 'settings' }),
          shortcuts: ['G', 'S'],
          exact: true,
        },
        {
          id: 'settings-account',
          label: t('page.settings.account.title'),
          icon: 'i-fa6-solid-circle-user',
          to: localePath({ name: 'settings-account' }),
        },
        {
          id: 'settings-security',
          label: t('page.settings.security.title'),
          icon: 'i-fa6-solid-lock',
          to: localePath({ name: 'settings-security' }),
        },
        {
          id: 'settings-notifications',
          label: t('page.settings.notifications.title'),
          icon: 'i-fa6-solid-bell',
          to: localePath({ name: 'settings-notifications' }),
        },
      ],
    });

    // shortcuts
    resetShortcuts();
    addShortcut({
      key: 'g-s',
      callback: () => {
        navigateToLocale({
          name: 'settings',
        });
      },
    });
  });

  // teams dropdown
  const route = useRoute();
  if (!team.value && currentUser.value?.teams && currentUser.value.teams.length > 0) {
    setTeam({ team: currentUser.value.teams[0] });
  }
  const teamsDropdownChangeHandler = ({ team }: { team: Team }) => {
    setTeam({ team });
  };
  watch(team, () => {
    if (!team.value) {
      return;
    }

    if (typeof route.name == 'string' && route.name?.startsWith('team-id')) {
      return navigateTo({
        name: route.name,
        params: {
          ...route.params,
          id: team.value.id.toString(),
        },
      });
    } else {
      return navigateToLocale({
        name: 'team-id',
        params: {
          id: team.value.id.toString(),
        },
      });
    }
  });
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown
            v-if="currentUser?.teams"
            :teams="currentUser.teams"
            :team="team"
            @change="teamsDropdownChangeHandler"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="getSidebarLinks()" />

        <!-- <UDivider /> -->

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => defaultColors = colors"
        /> -->

        <div class="flex-1" />

        <!-- <UDashboardSidebarLinks :links="footerLinks" /> -->

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <slot />

    <ClientOnly>
      <LazyUDashboardSearch
        v-if="getSearchGroupsWithLinks()"
        :groups="getSearchGroupsWithLinks()"
      />
    </ClientOnly>
  </UDashboardLayout>
</template>
