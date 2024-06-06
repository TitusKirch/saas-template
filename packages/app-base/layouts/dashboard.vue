<script setup lang="ts">
  const {
    addSidebarLinks,
    getSidebarLinks,
    resetSearchGroups,
    addSearchGroup,
    getSearchGroupsWithLinks,
    resetShortcuts,
    addShortcut,
  } = useDashboard();
  const { t } = useI18n();
  const localePath = useLocalePath();

  // sidebar links
  if (import.meta.server) {
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
    ]);
  }

  // search groups
  if (import.meta.server) {
    resetSearchGroups();
    addSearchGroup({
      key: 'settings',
      label: t('page.settings.title'),
      commands: [
        {
          id: 'settings-index',
          label: t('page.settings.index.title'),
          icon: 'i-fa6-solid-circle-user',
          to: localePath({ name: 'settings' }),
          shortcuts: ['G', 'S'],
          exact: true,
        },
        {
          id: 'settings-notifications',
          label: t('page.settings.notifications.title'),
          icon: 'i-fa6-solid-bell',
          to: localePath({ name: 'settings-notifications' }),
        },
      ],
    });
  }

  // shortcuts
  if (import.meta.client) {
    resetShortcuts();
    addShortcut({
      key: 'g-s',
      callback: () => {
        navigateToLocale({
          name: 'settings',
        });
      },
    });
  }
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <OrganizationsDropdown />
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
