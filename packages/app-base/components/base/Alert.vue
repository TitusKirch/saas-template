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
  <UAlert :color="color" :icon="icon" :title="title" :description="description">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
  </UAlert>
</template>
