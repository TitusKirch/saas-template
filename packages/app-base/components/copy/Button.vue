<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      value: string;
      variante?: 'icon' | 'button';
    }>(),
    {
      variante: 'button',
    }
  );

  const { copyToClipboard } = useUtils();
  const clickHandler = () => {
    copyToClipboard({
      value: props.value,
    });
  };

  const { t } = useI18n();
  const buttonProps = computed(() => {
    if (props.variante === 'button') {
      return {
        label: t('copy.button.label'),
        icon: 'i-fa6-solid-copy',
      };
    } else if (props.variante === 'icon') {
      return {
        icon: 'i-fa6-solid-copy',
        variant: 'link',
        class: 'p-0',
      };
    } else {
      return {};
    }
  });
</script>

<template>
  <UButton v-bind="buttonProps" @click="clickHandler" />
</template>
