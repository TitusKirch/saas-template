import { useDashboardStore } from '@tituskirch/app-base/stores/dashboard';
import type { Group } from '#ui/types';
import type { DashboardSidebarLink } from '@tituskirch/app-base/types/Dashboard';

export default function () {
  const dashboardStore = useDashboardStore();

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
    console.log('addShortcut');
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
    getSidebarLinks,
    addSidebarLink,
    addSidebarLinks,
    removeSidebarLink,
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
