<script setup lang="ts">
  // classes for same style
  const dashboardSectionUiClasses = {
    container: 'items-start',
    links: 'w-full md:w-auto md:min-w-80',
  };
  const dashboardSectionLinksDivClasses = 'flex flex-col w-full md:w-auto md:min-w-80';
  const formkitFieldClasses = {
    label: '$reset hidden',
  };
</script>

<template>
  <div>
    <UDashboardSection
      :title="$t('page.settings.index.section.theme.title')"
      :description="$t('page.settings.index.section.theme.description')"
      :ui="{
        ...dashboardSectionUiClasses,
      }"
    >
      <template #links>
        <ColorModeDropdown />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UDashboardSection
      :title="$t('page.settings.index.section.layout.title')"
      :description="$t('page.settings.index.section.layout.description')"
      :ui="{
        ...dashboardSectionUiClasses,
      }"
    >
      <template #links>
        <DashboardLayoutDropdown />
      </template>
    </UDashboardSection>
  </div>
</template>
