import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';
import type { Group } from '#ui/types';
import type { DashboardSidebarLink } from '@tituskirch/app-base/types/Dashboard';

export default function () {
  const dashboardStore = useDashboardStore();

  // layout
  const getLayout = () => {
    return dashboardStore.layout;
  };
  const { t } = useI18n();
  const getLayoutOptions = () => {
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

  // sidebar links
  const getSidebarLinks = () => {
    return dashboardStore.sidebarLinks;
  };
  const addSidebarLink = (link: DashboardSidebarLink) => {
    dashboardStore.addSidebarLink(link);
  };
  const addSidebarLinks = (links: DashboardSidebarLink[]) => {
    for (const link of links) {
      addSidebarLink(link);
    }
  };
  const removeSidebarLink = ({ id }: { id: string }) => {
    dashboardStore.removeSidebarLink({
      id,
    });
  };
  const resetSidebarLinks = () => {
    dashboardStore.resetSidebarLinks();
  };

  // search groups
  const getSearchGroups = () => {
    return dashboardStore.searchGroups;
  };
  const getSearchGroupsWithLinks = () => {
    return dashboardStore.getSearchGroupsWithLinks;
  };
  const addSearchGroup = (group: Group) => {
    dashboardStore.addSearchGroup(group);
  };
  const removeSearchGroup = ({ key }: { key: string }) => {
    dashboardStore.removeSearchGroup({
      key,
    });
  };
  const resetSearchGroups = () => {
    dashboardStore.resetSearchGroups();
  };

  // shortcuts
  const getShortcuts = () => {
    return dashboardStore.shortcuts;
  };
  const addShortcut = ({ key, callback }: { key: string; callback: () => void }) => {
    dashboardStore.addShortcut({
      key,
      callback,
    });
  };
  const removeShortcut = ({ key }: { key: string }) => {
    dashboardStore.removeShortcut({
      key,
    });
  };
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
  const resetShortcuts = () => {
    dashboardStore.resetShortcuts();
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
    // isHelpSlideoverOpen,
    // isNotificationsSlideoverOpen,
    getLayout,
    getLayoutOptions,
    getSidebarLinks,
    addSidebarLink,
    addSidebarLinks,
    removeSidebarLink,
    resetSidebarLinks,
    getSearchGroups,
    getSearchGroupsWithLinks,
    addSearchGroup,
    removeSearchGroup,
    resetSearchGroups,
    getShortcuts,
    addShortcut,
    removeShortcut,
    resetShortcuts,
  };
}
