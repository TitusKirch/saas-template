<script setup lang="ts">
  import { useAlertStore } from '@tituskirch/app-base/stores/alert';

  withDefaults(
    defineProps<{
      title?: string;
      toolbarIsNavigation?: boolean;
    }>(),
    {
      toolbarIsNavigation: false,
    }
  );
  defineSlots<{
    default: HTMLElement;
    navbarLeft?: HTMLElement;
    navbarRight?: HTMLElement;
    toolbarLeft?: HTMLElement;
    toolbar?: HTMLElement;
    toolbarRight?: HTMLElement;
  }>();

  const { layout } = useDashboard();

  const alertStore = useAlertStore();
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="title">
        <template v-if="$slots.navbarLeft" #left>
          <slot name="navbarLeft" />
        </template>

        <template v-if="$slots.navbarRight" #right>
          <slot name="navbarRight" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar
        v-if="$slots.toolbarLeft || $slots.toolbar || $slots.toolbarRight"
        :ui="{
          container:
            (layout === 'compress' ? 'max-w-7xl' : 'max-w-full') +
            ' transition-all duration-700 ease-in-out mx-auto',
        }"
        :class="{
          'overflow-x-auto px-1.5 py-0': toolbarIsNavigation,
        }"
        class="w-full transition-all duration-700 ease-in-out"
      >
        <template v-if="$slots.toolbarLeft" #left>
          <slot name="toolbarLeft" />
        </template>

        <template v-if="$slots.toolbar" #default>
          <slot name="toolbar" />
        </template>

        <template v-if="$slots.toolbarRight" #right>
          <slot name="toolbarRight" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <div
          :class="{
            'max-w-7xl': layout === 'compress',
            'max-w-full': layout === 'fullscreen',
          }"
          class="mx-auto flex w-full shrink-0 flex-col transition-all duration-700 ease-in-out"
        >
          <BaseAlertContainer id="alert-container">
            <UserNoPasswordAlert />
            <UserEmailIsNotVerifiedAlert />

            <BaseAlert
              v-for="alert in alertStore.getNonComponentAlerts"
              :key="alert.id"
              v-bind="alert"
            />
          </BaseAlertContainer>

          <div class="flex w-full flex-col gap-8">
            <slot />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>
  #alert-container > div:last-child {
    @apply mb-8;
  }
</style>
