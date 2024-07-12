<script setup lang="ts">
  import { useAlertStore } from '@tituskirch/app-base/stores/alert';

  const props = withDefaults(
    defineProps<{
      id?: string;
      type: AlertType;
      icon?: string;
      title?: string;
      description?: string;
      canBeClosed?: boolean;
      forceShow?: boolean;
      isHidden?: boolean;
      isNonPersistent?: boolean;
      isComponent?: boolean;
    }>(),
    {
      id: undefined,
      type: 'info',
      icon: '',
      title: '',
      description: '',
      canBeClosed: false,
      forceShow: false,
      isHidden: false,
      isNonPersistent: false,
      isComponent: true,
    }
  );
  defineSlots<{
    title?: HTMLElement;
    description?: HTMLElement;
  }>();
  const show = ref(!props.isHidden);
  const alertStore = useAlertStore();
  const { hideAlert } = useAlert();
  if (props.id) {
    if (alertStore.hiddenAlerts.includes(props.id)) {
      show.value = false;
    }
    watch(alertStore.alerts, (alerts) => {
      console.info('alerts changed');
      const alert = alerts.find((alert) => alert.id === props.id);
      if (alert) {
        show.value = !alert.isHidden;
      }
    });
  }

  const closeButton = computed(() => {
    return props.canBeClosed && !props.forceShow ? {} : null;
  });
  const close = () => {
    if (props.id) {
      if (props.isComponent) {
        show.value = false;
      }
      hideAlert({
        id: props.id,
      });
    } else {
      show.value = false;
    }
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
    :close-button="closeButton"
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
