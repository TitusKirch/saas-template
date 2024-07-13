import type { Group } from '#ui/types';
import type { DashboardSidebarLink } from '@tituskirch/app-base/types/Dashboard';

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    // layout
    const layout = ref<'fullscreen' | 'compress'>('fullscreen');

    // sidebar links
    const localePath = useLocalePath();
    const sidebarLinks = ref<DashboardSidebarLink[]>([]);
    const addSidebarLink = (link: DashboardSidebarLink) => {
      sidebarLinks.value.push({
        ...link,
        to: link.to ? localePath(link.to) : undefined,
      });
    };
    const removeSidebarLink = ({ id }: { id: string }) => {
      sidebarLinks.value = sidebarLinks.value.filter((link) => link.id !== id);
    };
    const resetSidebarLinks = () => {
      sidebarLinks.value = [];
    };

    // search groups
    const { t } = useI18n();
    const searchGroups = ref<Group[]>([]);
    const addSearchGroup = (group: Group) => {
      searchGroups.value.push(group);
    };
    const removeSearchGroup = ({ key }: { key: string }) => {
      searchGroups.value = searchGroups.value.filter((group) => group.key !== key);
    };
    const getSearchGroupsWithLinks = computed(() => {
      return [
        ...searchGroups.value,
        {
          key: 'links',
          label: t('dashboard.search.group.links.label'),
          commands: sidebarLinks.value.map((link) => ({
            ...link,
            shortcuts: link.tooltip?.shortcuts,
          })),
        } as Group,
      ];
    });
    const resetSearchGroups = () => {
      searchGroups.value = [];
    };

    // shortcuts
    const shortcuts = ref<Record<string, () => void>>({});
    const addShortcut = ({ key, callback }: { key: string; callback: () => void }) => {
      shortcuts.value[key] = callback;
    };
    const removeShortcut = ({ key }: { key: string }) => {
      const { [key]: removedShortcut, ...rest } = shortcuts.value;
      console.debug(`Shortcut with key "${key}" removed`, removedShortcut);
      shortcuts.value = rest;
    };
    const resetShortcuts = () => {
      shortcuts.value = {};
    };

    return {
      layout,
      sidebarLinks,
      addSidebarLink,
      removeSidebarLink,
      resetSidebarLinks,
      searchGroups,
      addSearchGroup,
      removeSearchGroup,
      getSearchGroupsWithLinks,
      resetSearchGroups,
      shortcuts,
      addShortcut,
      removeShortcut,
      resetShortcuts,
    };
  },
  {
    persist: {
      paths: ['layout'],
    },
  }
);
