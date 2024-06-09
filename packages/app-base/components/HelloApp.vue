<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      toLowerCase?: boolean;
    }>(),
    {
      toLowerCase: false,
    }
  );

  const message = computed(() => {
    return props.toLowerCase ? 'hello app!' : 'Hello App!';
  });
</script>

<template>
  <h1>{{ message }}</h1>
</template>
