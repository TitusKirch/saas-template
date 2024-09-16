<script setup lang="ts">
  const { progress, isLoading } = useLoadingIndicator();

  // const showProgress = ref(false);
  // const showProgressTimeout = ref<NodeJS.Timeout | null>(null);
  // watch(progress, (value) => {
  //   console.log('progress', value);
  //   if (value == 100) {
  //     showProgressTimeout.value = setTimeout(() => {
  //       showProgress.value = false;
  //     }, 200);
  //   } else {
  //     showProgress.value = true;
  //     if (showProgressTimeout.value) {
  //       clearTimeout(showProgressTimeout.value);
  //     }
  //   }
  // });

  // onBeforeUnmount(() => {
  //   if (showProgressTimeout.value) {
  //     clearTimeout(showProgressTimeout.value);
  //   }
  // });
</script>

<template>
  <UProgress
    v-if="isLoading"
    color="primary"
    :value="progress"
    size="xs"
    :ui="{
      wrapper: 'fixed top-0 left-0 w-full z-50',
      progress: {
        rounded: false,
        track: '[&::-webkit-progress-bar]:!bg-transparent',
        bar: ' \
                [&::-webkit-progress-value]:rounded-none [&::-moz-progress-bar]:rounded-none \
                [&::-webkit-progress-value]:rounded-r-full [&::-moz-progress-bar]:rounded-r-full \
              ',
      },
    }"
  />
</template>
