import type { Group } from '#ui/types';
import type { DashboardSidebarLink } from '@tituskirch/app-base/types/Dashboard';

export const useDashboardStore = defineStore('dashboard', () => {
  // sidebar links
  const localePath = useLocalePath();
  const sidebarLinks: Ref<DashboardSidebarLink[]> = ref([]);
  const addSidebarLink = (link: DashboardSidebarLink) => {
    sidebarLinks.value.push({
      ...link,
      to: link.to ? localePath(link.to) : undefined,
    });
  };
  const removeSidebarLink = ({ id }: { id: string }) => {
    sidebarLinks.value = sidebarLinks.value.filter((link) => link.id !== id);
  };

  // search groups
  const { t } = useI18n();
  const searchGroups: Ref<Group[]> = ref([]);
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
      },
    ];
  });
  const resetSearchGroups = () => {
    searchGroups.value = [];
  };

  // shortcuts
  const shortcuts: Ref<Record<string, () => void>> = ref({});
  const addShortcut = ({ key, callback }: { key: string; callback: () => void }) => {
    console.log('addShortcut2');
    shortcuts.value[key] = callback;
  };
  const removeShortcut = ({ key }: { key: string }) => {
    delete shortcuts.value[key];
  };
  const resetShortcuts = () => {
    shortcuts.value = {};
  };

  return {
    sidebarLinks,
    addSidebarLink,
    removeSidebarLink,
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
});
