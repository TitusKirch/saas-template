export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',
    alert: {
      wrapper: 'flex-shrink-0',
      title: 'py-1.5',
      padding: 'py-2.5',
      default: {
        variant: 'subtle',
        actionButton: {
          variant: 'link',
        },
      },
    },
    badge: {
      default: {
        // variant: 'subtle',
      },
    },
    button: {
      rounded: 'rounded-full',
      default: {
        loadingIcon: 'i-fa6-solid-arrows-rotate',
      },
    },
    card: {
      divide: 'divide-y-0',
    },
    // dashboard: {
    //   panel: {
    //     content: {
    //       wrapper: 'gap-8',
    //     },
    //   },
    // },
    header: {
      button: {
        icon: {
          open: 'i-fa6-solid-bars',
          close: 'i-fa6-solid-x',
        },
      },
    },
    icons: {
      dark: 'i-fa6-solid-moon',
      light: 'i-fa6-solid-sun',
    },
    notification: {
      default: {
        closeButton: {
          icon: 'i-fa6-solid-xmark',
        },
      },
    },
    page: {
      header: {
        wrapper: 'border-b-0 py-0',
      },
    },
    pagination: {
      default: {
        activeButton: {
          variant: 'outline',
        },
        firstButton: {
          icon: 'i-fa6-solid-angles-left',
        },
        lastButton: {
          icon: 'i-fa6-solid-angles-right',
        },
        prevButton: {
          icon: 'i-fa6-solid-angle-left',
        },
        nextButton: {
          icon: 'i-fa6-solid-angle-right',
        },
      },
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-fa6-solid-check',
      },
    },
    table: {
      default: {
        emptyState: {
          icon: 'i-fa6-solid-database',
        },
        loadingState: {
          icon: 'i-fa6-solid-arrows-rotate',
        },
        sortAscIcon: 'i-fa6-solid-sort-up',
        sortDescIcon: 'i-fa6-solid-sort-down',
        sortButton: {
          icon: 'i-fa6-solid-sort',
        },
      },
    },
    tooltip: {
      popper: {
        arrow: true,
      },
    },
  },
});
