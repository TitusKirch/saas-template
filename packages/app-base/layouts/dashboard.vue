<script setup lang="ts">
  import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';
  import type { DashboardSidebarLink } from '@tituskirch/app-base/types/Dashboard';

  // init dashboard
  const {
    addSearchGroup,
    addShortcut,
    addSidebarLinkGroups,
    removeSidebarLinkGroup,
    replaceOrAddSidebarLinkGroup,
    resetSearchGroups,
    resetShortcuts,
    searchGroupsWithLinks,
    sidebarFooterLinkGroups,
    sidebarMainLinkGroups,
  } = useDashboard();

  const dashboardStore = useDashboardStore();
  const { t } = useI18n();
  const localePath = useLocalePath();
  const { currentUser } = useCurrentUser();
  const { team, setTeam } = useTeam();

  const setTeamSidebarLinkGroup = () => {
    if (!team.value) {
      console.log('remove team sidebar link group');
      removeSidebarLinkGroup({
        id: 'team',
      });
      return;
    }

    replaceOrAddSidebarLinkGroup({
      group: {
        id: 'team',
        position: 'main',
        links: [
          {
            id: 'team-id',
            label: team.value.name,
            icon: 'i-fa6-solid-users',
            to: localePath({
              name: 'team-id',
              params: {
                id: team.value?.id.toString(),
              },
            }),
            tooltip: {
              text: t('page.team.id.index.title'),
              shortcuts: ['G', 'T'],
            },
            sort: 1,
          },
          {
            id: 'team-id',
            label: '2',
            icon: 'i-fa6-solid-users',
            to: localePath({
              name: 'team-id',
              params: {
                id: team.value?.id.toString(),
              },
            }),
            sort: 3,
          },
        ],
      },
    });
  };

  onMounted(() => {
    addSidebarLinkGroups({
      groups: [
        {
          id: 'general',
          position: 'main',
          links: [
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
          ],
        },
      ],
    });
    setTeamSidebarLinkGroup();
  });

  onMounted(() => {
    // search groups
    resetSearchGroups();
    addSearchGroup({
      group: {
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
      },
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

    setTeamSidebarLinkGroup();

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

        <template v-if="sidebarMainLinkGroups.length > 0">
          <template v-for="(group, index) in sidebarMainLinkGroups" :key="group.id">
            <template v-if="group?.links?.length && group.links.length > 0">
              <UDashboardSidebarLinks
                :links="group.links.sort((a, b) => (a.sort || 0) - (b.sort || 0))"
              />
              <UDivider v-if="index < sidebarMainLinkGroups.length - 1" />
            </template>
          </template>
        </template>

        <div class="flex-1" />

        <template v-if="sidebarFooterLinkGroups.length > 0">
          <template v-for="(group, index) in sidebarFooterLinkGroups" :key="group.id">
            <template v-if="group?.links?.length && group.links.length > 0">
              <UDashboardSidebarLinks
                :links="group.links.sort((a, b) => (a.sort || 0) - (b.sort || 0))"
              />
              <UDivider v-if="index < sidebarFooterLinkGroups.length - 1" />
            </template>
          </template>
        </template>

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <slot />

    <ClientOnly>
      <LazyUDashboardSearch v-if="searchGroupsWithLinks" :groups="searchGroupsWithLinks" />
    </ClientOnly>
  </UDashboardLayout>
</template>
