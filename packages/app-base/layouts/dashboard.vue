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

      <UDashboardSidebar />
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
