<script setup lang="ts">
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
          'py-0 px-1.5 overflow-x-auto': toolbarIsNavigation,
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
          class="flex flex-col gap-8 flex-shrink-0 w-full transition-all duration-700 ease-in-out mx-auto"
        >
          <UserEmailIsNotVerifiedAlert />

          <slot />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
