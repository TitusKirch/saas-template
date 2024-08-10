import type { DashboardSidebarLink as NuxtUiProDashboardSidebarLink } from '@nuxt/ui-pro/types';

type DashboardSidebarLink = NuxtUiProDashboardSidebarLink & {
  id: string;
  sort?: number;
};

type DashboardSidebarLinkGroup = {
  id: string;
  sort?: number;
  position?: 'main' | 'footer';
  links?: DashboardSidebarLink[];
};
