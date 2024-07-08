<script setup lang="ts">
  import { useAlertStore } from '@tituskirch/app-base/stores/alert';

  withDefaults(
    defineProps<{
      title: string;
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

  const { getLayout } = useDashboard();

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
            (getLayout() === 'compress' ? 'max-w-7xl' : 'max-w-full') +
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
            'max-w-7xl': getLayout() === 'compress',
            'max-w-full': getLayout() === 'fullscreen',
          }"
          class="mx-auto flex w-full shrink-0 flex-col gap-8 transition-all duration-700 ease-in-out"
        >
          <BaseAlertContainer>
            <UserNoPasswordAlert />
            <UserEmailIsNotVerifiedAlert />

            <BaseAlert
              v-for="alert in alertStore.getNonComponentAlerts"
              :key="alert.id"
              v-bind="alert"
            />
          </BaseAlertContainer>

          <slot />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
