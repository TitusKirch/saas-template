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
        :class="{
          'py-0 px-1.5 overflow-x-auto': toolbarIsNavigation,
        }"
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
        <UserEmailIsNotVerifiedAlert />

        <slot />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
