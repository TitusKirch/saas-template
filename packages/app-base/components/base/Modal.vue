<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      type: AlertType;
      icon?: string;
      title?: string;
      description?: string;
    }>(),
    {
      type: 'info',
      icon: '',
      title: '',
      description: '',
    }
  );
  defineSlots<{
    title?: HTMLElement;
    description?: HTMLElement;
    default?: HTMLElement;
    footer?: HTMLElement;
  }>();

  const { getColorByType, getIconByType } = useAlertStyle();
  const color = computed(() => {
    return getColorByType({ type: props.type });
  });
  const icon = computed(() => {
    if (props.icon) {
      return props.icon;
    }

    return getIconByType({ type: props.type });
  });
</script>

<template>
  <UDashboardModal
    :title="title"
    :description="description"
    :icon="icon"
    :ui="{
      icon: { base: `text-${color}-500 dark:text-${color}-400` } as any,
      body: {
        base: 'ml-16',
      } as any,
      footer: { base: 'ml-16' } as any,
    }"
  >
    <template #title v-if="$slots.title">
      <slot name="title" />
    </template>

    <template #description v-if="$slots.description">
      <slot name="description" />
    </template>

    <template #default v-if="$slots.default">
      <slot name="default" />
    </template>

    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </UDashboardModal>
</template>
