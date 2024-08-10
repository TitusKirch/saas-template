import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';

export default function () {
  const dashboardStore = useDashboardStore();
  const dashboardStoreRefs = storeToRefs(dashboardStore);

  // layout
  const { t } = useI18n();
  const layoutOptions = () => {
    return [
      {
        value: 'fullscreen',
        label: t('dashboard.layout.fullscreen.label'),
        icon: 'i-fa6-solid-expand',
      },
      {
        value: 'compress',
        label: t('dashboard.layout.compress.label'),
        icon: 'i-fa6-solid-compress',
      },
    ];
  };

  // shortcuts
  const setShortcuts = () => {
    const shortcuts: Record<string, () => void> = {
      ...dashboardStore.shortcuts,
    };

    if (dashboardStoreRefs.sidebarLinkGroups.value.length > 0) {
      const links = dashboardStoreRefs.sidebarLinkGroups.value.flatMap(
        (group) => group.links || []
      );

      if (links.length > 0) {
        for (const link of links) {
          if (link.tooltip?.shortcuts) {
            shortcuts[link.tooltip?.shortcuts.join('-').toLowerCase()] = () => navigateTo(link.to);
          }
        }
      }
    }

    defineShortcuts(shortcuts);
  };
  setShortcuts();
  watch(dashboardStoreRefs.sidebarLinkGroups, () => {
    setShortcuts();
  });

  // const route = useRoute();
  // const router = useRouter();
  // const isHelpSlideoverOpen = ref(false);
  // const isNotificationsSlideoverOpen = ref(false);

  // defineShortcuts({
  //   '?': () => (isHelpSlideoverOpen.value = true),
  //   n: () => (isNotificationsSlideoverOpen.value = true),
  // });

  // watch(
  //   () => route.fullPath,
  //   () => {
  //     isHelpSlideoverOpen.value = false;
  //     isNotificationsSlideoverOpen.value = false;
  //   }
  // );

  return {
    ...dashboardStore,
    ...dashboardStoreRefs,
    layoutOptions,
    // isHelpSlideoverOpen,
    // isNotificationsSlideoverOpen,
  };
}
