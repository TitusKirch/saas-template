<script setup lang="ts">
  // setup component
  const props = withDefaults(
    defineProps<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      code: any;
      title?: string;
      language?: string;
      defaultIsOpen?: boolean;
      hasCopyAction?: boolean;
    }>(),
    {
      title: 'Untitled code',
      language: 'JSON',
      defaultIsOpen: false,
      hasCopyAction: true,
    }
  );
  const emits = defineEmits<{
    toggle: [isOpen: boolean];
  }>();
  const { code } = toRefs(props);

  // toggle code
  const isOpen = ref(props.defaultIsOpen);
  const clickToggleHandler = () => {
    isOpen.value = !isOpen.value;
    emits('toggle', isOpen.value);
  };

  // copy to clipboard
  const copiedInLast5Seconds = ref(false);
  const clickCopyToClipboardHandler = () => {
    if (!props.code || copiedInLast5Seconds.value) return;

    const codeToCopy =
      typeof props.code === 'object' ? JSON.stringify(props.code, null, 2) : props.code;
    navigator.clipboard.writeText(codeToCopy);

    copiedInLast5Seconds.value = true;
    setTimeout(() => {
      copiedInLast5Seconds.value = false;
    }, 5000);
  };

  // scrollbar padding
  const codeContainer = ref<HTMLElement | null>(null);
  const codeContainerHasScrollbar = ref(false);
  const checkScrollbar = () => {
    if (!codeContainer.value || !isOpen.value) {
      codeContainerHasScrollbar.value = false;
      return;
    }

    codeContainerHasScrollbar.value =
      codeContainer.value.scrollWidth > codeContainer.value.clientWidth;
  };
  onMounted(() => {
    window.addEventListener('resize', () => {
      checkScrollbar();
    });

    checkScrollbar();
  });
  watch(isOpen, () => {
    setTimeout(() => {
      checkScrollbar();
    }, 1);
  });
  watch(code, () => {
    setTimeout(() => {
      checkScrollbar();
    }, 1);
  });
</script>

<template>
  <DevOnly>
    <div>
      <div class="overflow-hidden border-none">
        <div class="flex select-none flex-col sm:h-14 sm:flex-row sm:items-center sm:gap-4">
          <div
            class="flex h-14 grow items-center gap-3 p-4 leading-6 text-gray-700 hover:cursor-pointer dark:text-gray-300 sm:h-full"
            @click="clickToggleHandler"
          >
            <UIcon
              name="i-fa6-solid-chevron-right"
              :class="{
                'rotate-90 transform': isOpen,
              }"
              class="text-lg transition-transform duration-100"
            />

            <span class="text-lg font-semibold">{{ title }}</span>
          </div>
          <div
            :class="{
              'hidden sm:flex': !isOpen,
            }"
            class="flex h-full flex-col sm:flex-row"
          >
            <slot name="actions" />

            <DevCodeAction
              v-if="hasCopyAction"
              class="sm:w-28"
              icon="i-fa6-solid-copy"
              :title="
                copiedInLast5Seconds
                  ? $t('base.dev.code.action.copy.copiedToClipboard.title')
                  : $t('base.dev.code.action.copy.title')
              "
              :disabled="code == undefined || copiedInLast5Seconds"
              @on-click="clickCopyToClipboardHandler"
            />
          </div>
        </div>
        <div
          v-if="isOpen"
          class="bg-gray-300 px-4 py-3 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
        >
          <div
            ref="codeContainer"
            :class="{
              'pb-1': codeContainerHasScrollbar,
            }"
            class="overflow-x-auto"
          >
            <pre><code :class="language">{{ code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </DevOnly>
</template>

<style scoped>
  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-thumb {
    @apply rounded-full;
  }
</style>
