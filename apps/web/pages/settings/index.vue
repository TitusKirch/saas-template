<script setup lang="ts"></script>

<template>
  <div>
    <UDashboardSection
      :title="$t('page.settings.index.section.theme.title')"
      :description="$t('page.settings.index.section.theme.description')"
    >
      <template #links>
        <ColorModeFormDropdown />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UDashboardSection
      :title="$t('page.settings.index.section.layout.title')"
      :description="$t('page.settings.index.section.layout.description')"
    >
      <template #links>
        <DashboardLayoutFormDropdown />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UDashboardSection
      :title="$t('page.settings.index.section.locale.title')"
      :description="$t('page.settings.index.section.locale.description')"
    >
      <template #links>
        <LocaleFormDropdown />
      </template>
    </UDashboardSection>
  </div>
</template>
