<script setup lang="ts">
  const { isHelpSlideoverOpen } = useDashboard();
  const { isDashboardSearchModalOpen } = useUIState();
  const { metaSymbol } = useShortcuts();

  const { me } = useUser();
  const user = await me();

  const { t } = useI18n();
  const localePath = useLocalePath();
  const items = computed(() => [
    [
      {
        slot: 'account',
        label: '',
        disabled: true,
      },
    ],
    [
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth',
        shortcuts: ['G', 'S'],
        to: localePath({ name: 'settings' }),
      },
      {
        label: 'Command menu',
        icon: 'i-heroicons-command-line',
        shortcuts: [metaSymbol.value, 'K'],
        click: () => {
          isDashboardSearchModalOpen.value = true;
        },
      },
      {
        label: 'Help & Support',
        icon: 'i-heroicons-question-mark-circle',
        shortcuts: ['?'],
        click: () => (isHelpSlideoverOpen.value = true),
      },
    ],
    [
      {
        label: t('global.action.auth.logout.label'),
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: () => {
          navigateToLocale({
            name: 'auth-logout',
          });
        },
      },
    ],
  ]);
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="`${user?.first_name} ${user?.last_name}`"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar size="2xs" :alt="`${user?.first_name} ${user?.last_name}`" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">{{ user?.email }}</p>
      </div>
    </template>
  </UDropdown>
</template>
