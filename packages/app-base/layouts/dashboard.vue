<script setup lang="ts">
  const route = useRoute();
  const appConfig = useAppConfig();
  // const { isHelpSlideoverOpen } = useDashboard();

  const router = useRouter();
  defineShortcuts({
    'g-d': () => router.push('/dashboard'),
    'g-p': () => router.push('/placeholder'),
  });

  const links = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'i-heroicons-home',
      to: '/dashboard',
      tooltip: {
        text: 'Dashboard',
        shortcuts: ['G', 'D'],
      },
    },
    {
      id: 'placeholder',
      label: 'Placeholder',
      icon: 'i-heroicons-clipboard',
      to: '/placeholder',
      tooltip: {
        text: 'Placeholder',
        shortcuts: ['G', 'P'],
      },
    },
  ];

  const groups = [
    {
      key: 'links',
      label: 'Go to',
      commands: links.map((link) => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
    },
  ];
</script>

<template>
  <!-- <div class="h-screen">
    <BaseAlertContainer>
      <UserEmailIsNotVerifiedAlert />
    </BaseAlertContainer>

    <UMain
      :ui="{
        wrapper: 'mt-8',
      }"
    >
      <slot />
    </UMain>
  </div> -->

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

        <UDashboardSidebarLinks :links="links" />

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
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
