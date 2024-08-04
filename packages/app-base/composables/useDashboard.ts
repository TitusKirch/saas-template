import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';
import type { Group } from '#ui/types';
import type { DashboardSidebarLink } from '@tituskirch/app-base/types/Dashboard';

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

    for (const link of dashboardStore.sidebarLinks) {
      if (link.tooltip?.shortcuts) {
        shortcuts[link.tooltip?.shortcuts.join('-').toLowerCase()] = () => navigateTo(link.to);
      }
    }

    defineShortcuts(shortcuts);
  };
  setShortcuts();
  watch(
    () => dashboardStore.shortcuts,
    () => setShortcuts()
  );
  watch(
    () => dashboardStore.sidebarLinks,
    () => setShortcuts()
  );

  // const route = useRoute();
  // const router = useRouter();
  // const isHelpSlideoverOpen = ref(false);
  // const isNotificationsSlideoverOpen = ref(false);

  // defineShortcuts({
  //   'g-h': () => router.push('/'),
  //   'g-i': () => router.push('/inbox'),
  //   'g-u': () => router.push('/users'),
  //   'g-s': () => router.push('/settings'),
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
