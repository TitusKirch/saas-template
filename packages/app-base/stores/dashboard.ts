import type { Group } from '#ui/types';
import type {
  DashboardSidebarLink,
  DashboardSidebarLinkGroup,
} from '@tituskirch/app-base/types/Dashboard';

export const useDashboardStore = defineStore(
  'dashboard',
  () => {
    // layout
    const layout = ref<'fullscreen' | 'compress'>('fullscreen');

    // sidebar link groups
    const sidebarLinkGroups = ref<DashboardSidebarLinkGroup[]>([]);

    // sidebar link groups by position
    const sidebarMainLinkGroups = computed(() =>
      sidebarLinkGroups.value
        .filter((group) => group.position == 'main' || !group.position)
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
    );
    const sidebarFooterLinkGroups = computed(() =>
      sidebarLinkGroups.value
        .filter((group) => group.position == 'footer')
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
    );

    // sidebar link group actions
    const addSidebarLinkGroup = ({ group: newGroup }: { group: DashboardSidebarLinkGroup }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === newGroup.id);
      if (group) {
        console.warn(`Group with id "${newGroup.id}" already exists`);
        return;
      }
      sidebarLinkGroups.value.push(newGroup);
    };
    const addSidebarLinkGroups = ({ groups }: { groups: DashboardSidebarLinkGroup[] }) => {
      groups.forEach((group) => addSidebarLinkGroup({ group }));
    };
    const removeSidebarLinkGroup = ({ id }: { id: string }) => {
      sidebarLinkGroups.value = sidebarLinkGroups.value.filter((group) => group.id !== id);
    };
    const replaceSidebarLinkGroup = ({
      id,
      group: newGroup,
    }: {
      id: string;
      group: DashboardSidebarLinkGroup;
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === id);
      if (!group) {
        console.warn(`Group with id "${id}" not found`);
        return;
      }

      sidebarLinkGroups.value = sidebarLinkGroups.value.map((group) =>
        group.id === id ? newGroup : group
      );
    };
    const replaceOrAddSidebarLinkGroup = ({
      group: newGroup,
    }: {
      group: DashboardSidebarLinkGroup;
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === newGroup.id);
      if (group) {
        replaceSidebarLinkGroup({ id: newGroup.id, group: newGroup });
      } else {
        addSidebarLinkGroup({ group: newGroup });
      }
    };
    const resetSidebarLinkGroups = () => {
      sidebarLinkGroups.value = [];
    };

    // sidebar link in group actions
    const addSidebarLinkToGroup = ({
      groupId,
      link,
    }: {
      groupId: string;
      link: DashboardSidebarLink;
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === groupId);

      if (!group) {
        console.warn(`Group with id "${groupId}" not found`);
        return;
      }

      if (!group.links) {
        group.links = [];
      }

      group.links.push(link);
    };
    const addSidebarLinksToGroup = ({
      groupId,
      links,
    }: {
      groupId: string;
      links: DashboardSidebarLink[];
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === groupId);

      if (!group) {
        console.warn(`Group with id "${groupId}" not found`);
        return;
      }

      if (!group.links) {
        group.links = [];
      }

      group.links.push(...links);
    };
    const removeSidebarLinkFromGroup = ({
      groupId,
      linkId,
    }: {
      groupId: string;
      linkId: string;
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === groupId);
      if (!group) {
        console.warn(`Group with id "${groupId}" not found`);
        return;
      }

      if (!group.links) {
        console.warn(`Group with id "${groupId}" has no links`);
        return;
      }

      group.links = group.links.filter((link) => link.id !== linkId);
    };
    const replaceSidebarLinkInGroup = ({
      groupId,
      linkId,
      link: newLink,
    }: {
      groupId: string;
      linkId: string;
      link: DashboardSidebarLink;
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === groupId);
      if (!group) {
        console.warn(`Group with id "${groupId}" not found`);
        return;
      }

      if (!group.links) {
        console.warn(`Group with id "${groupId}" has no links`);
        return;
      }

      group.links = group.links.map((link) => (link.id === linkId ? newLink : link));
    };
    const replaceOrAddSidebarLinkInGroup = ({
      groupId,
      link: newLink,
    }: {
      groupId: string;
      link: DashboardSidebarLink;
    }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === groupId);
      if (!group) {
        console.warn(`Group with id "${groupId}" not found`);
        return;
      }

      if (!group.links) {
        group.links = [];
      }

      const existingLink = group.links.find((link) => link.id === newLink.id);
      if (existingLink) {
        replaceSidebarLinkInGroup({ groupId, linkId: newLink.id, link: newLink });
      } else {
        addSidebarLinkToGroup({ groupId, link: newLink });
      }
    };
    const resetSidebarLinksInGroup = ({ groupId }: { groupId: string }) => {
      const group = sidebarLinkGroups.value.find((group) => group.id === groupId);
      if (!group) {
        console.warn(`Group with id "${groupId}" not found`);
        return;
      }

      group.links = [];
    };

    // search groups
    const { t } = useI18n();
    const searchGroups = ref<Group[]>([]);
    const addSearchGroup = ({ group }: { group: Group }) => {
      searchGroups.value.push(group);
    };
    const removeSearchGroup = ({ key }: { key: string }) => {
      searchGroups.value = searchGroups.value.filter((group) => group.key !== key);
    };
    const searchGroupsWithLinks = computed(() => {
      const result = [...searchGroups.value];

      if (sidebarLinkGroups.value.length > 0) {
        const links = sidebarLinkGroups.value.flatMap((group) => group.links || []);

        if (links.length > 0) {
          result.push({
            key: 'links',
            label: t('dashboard.search.group.links.label'),
            commands: links.map((link) => ({
              ...link,
              shortcuts: link.tooltip?.shortcuts,
            })),
          } as Group);
        }
      }

      return result;
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
      addSearchGroup,
      addShortcut,
      addSidebarLinkGroup,
      addSidebarLinkGroups,
      addSidebarLinksToGroup,
      addSidebarLinkToGroup,
      layout,
      removeSearchGroup,
      removeShortcut,
      removeSidebarLinkFromGroup,
      removeSidebarLinkGroup,
      replaceOrAddSidebarLinkGroup,
      replaceOrAddSidebarLinkInGroup,
      replaceSidebarLinkGroup,
      replaceSidebarLinkInGroup,
      resetSearchGroups,
      resetShortcuts,
      resetSidebarLinkGroups,
      resetSidebarLinksInGroup,
      searchGroups,
      searchGroupsWithLinks,
      shortcuts,
      sidebarFooterLinkGroups,
      sidebarLinkGroups,
      sidebarMainLinkGroups,
    };
  },
  {
    persist: {
      paths: ['layout'],
    },
  }
);
