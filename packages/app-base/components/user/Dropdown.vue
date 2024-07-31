<script setup lang="ts">
  const { fetchCurrentUserAvatar, currentUser, currentUserAvatarUrl, fetchUserAvatarStatus } =
    useCurrentUser();

  // user avatar
  onMounted(async () => {
    if (!currentUserAvatarUrl.value) {
      await fetchCurrentUserAvatar();
    }
  });

  // const { isHelpSlideoverOpen } = useDashboard();
  const { isDashboardSearchModalOpen } = useUIState();
  const { metaSymbol } = useShortcuts();

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
        label: t('page.settings.title'),
        icon: 'i-fa6-solid-gears',
        shortcuts: ['G', 'S'],
        to: localePath({ name: 'settings' }),
      },
      {
        label: t('commandMenu.title'),
        icon: 'i-fa6-solid-terminal',
        shortcuts: [metaSymbol.value, 'K'],
        click: () => {
          isDashboardSearchModalOpen.value = true;
        },
      },
      {
        label: t('helpSlideover.title'),
        icon: 'i-fa6-solid-circle-question',
        shortcuts: ['?'],
        click: () => {}, //(isHelpSlideoverOpen.value = true),
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
        :label="`${currentUser?.first_name} ${currentUser?.last_name}`"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UserAvatar
            size="3xs"
            :src="currentUserAvatarUrl"
            :user="currentUser"
            :loading="!currentUserAvatarUrl && fetchUserAvatarStatus !== 'success'"
          />
        </template>

        <template #trailing>
          <UIcon name="i-fa6-solid-ellipsis-vertical" class="ml-auto size-5" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>{{ $t('user.dropdown.signedInAs') }}</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ currentUser?.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
