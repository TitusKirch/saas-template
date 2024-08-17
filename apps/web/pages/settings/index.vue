<script setup lang="ts"></script>

<template>
  <DashboardPageGrid>
    <UCard>
      <template #header>
        <CardHeader
          :title="$t('page.settings.index.section.apperance.title')"
          :description="$t('page.settings.index.section.apperance.description')"
        />
      </template>
      <UDashboardSection
        :title="$t('page.settings.index.section.apperance.theme.title')"
        :description="$t('page.settings.index.section.apperance.theme.description')"
      >
        <template #links>
          <ColorModeFormDropdown />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('page.settings.index.section.apperance.layout.title')"
        :description="$t('page.settings.index.section.apperance.layout.description')"
      >
        <template #links>
          <DashboardLayoutFormDropdown />
        </template>
      </UDashboardSection>
    </UCard>
    <UCard>
      <template #header>
        <CardHeader
          :title="$t('page.settings.index.section.localization.title')"
          :description="$t('page.settings.index.section.localization.description')"
        />
      </template>

      <UDashboardSection
        :title="$t('page.settings.index.section.localization.locale.title')"
        :description="$t('page.settings.index.section.localization.locale.description')"
      >
        <template #links>
          <LocaleFormDropdown />
        </template>
      </UDashboardSection>
    </UCard>
  </DashboardPageGrid>
</template>
