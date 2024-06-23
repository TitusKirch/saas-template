<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      type: AlertType;
      icon?: string;
      title?: string;
      description?: string;
      canBeClosed?: boolean;
      forceShow?: boolean;
    }>(),
    {
      type: 'info',
      icon: '',
      title: '',
      description: '',
      canBeClosed: false,
      forceShow: false,
    }
  );
  defineSlots<{
    title?: HTMLElement;
    description?: HTMLElement;
  }>();
  const show = ref(true);

  const closedButton = computed(() => {
    return props.canBeClosed && !props.forceShow;
  });
  const close = () => {
    show.value = false;
  };

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
  <UAlert
    v-if="show || forceShow"
    :color="color"
    :icon="icon"
    :title="title"
    :description="description"
    :close-button="closedButton"
    @close="close"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
  </UAlert>
</template>
