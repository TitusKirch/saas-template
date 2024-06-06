<script setup lang="ts">
  const colorMode = useColorMode();
  const appConfig = useAppConfig();

  const options = computed(() => [
    { label: 'System', value: 'system', icon: appConfig.ui.icons.system },
    { label: 'Light', value: 'light', icon: appConfig.ui.icons.light },
    { label: 'Dark', value: 'dark', icon: appConfig.ui.icons.dark },
  ]);

  const preference = ref(
    options.value.find((option) => option.value === colorMode.preference)?.value ||
      options.value[0].value
  );
  watch(preference, (value) => {
    colorMode.preference = value;
  });
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <FormKit type="dropdown" name="preference" v-model="preference" popover :options="options">
      <template #option="{ option, classes }">
        <div :class="`${classes.option} flex items-center`">
          <UIcon :name="option.icon" class="w-5 mr-2" />
          <span>
            {{ option.label }}
          </span>
        </div>
      </template>
    </FormKit>

    <template #fallback>
      <FormKit
        type="dropdown"
        name="preference"
        v-model="preference"
        popover
        :options="options"
        disabled
      >
        <template #option="{ option, classes }">
          <div :class="`${classes.option} flex items-center`">
            <UIcon :name="option.icon" class="w-5 mr-2" />
            <span>
              {{ option.label }}
            </span>
          </div>
        </template>
      </FormKit>
    </template>
  </ClientOnly>
</template>
