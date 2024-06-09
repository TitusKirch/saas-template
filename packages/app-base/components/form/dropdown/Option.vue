<script setup lang="ts">
  defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classes?: any;
  }>();
  defineSlots<{
    icon?: HTMLElement;
    label?: HTMLElement;
  }>();
</script>

<template>
  <div :class="`${classes.option} flex items-center`">
    <slot name="icon">
      <UIcon :name="option.icon" class="w-5 mr-2" />
    </slot>
    <span>
      <slot name="label">
        {{ option.label }}
      </slot>
    </span>
  </div>
</template>
