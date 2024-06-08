export const classes = {
  global: {
    suffixIcon:
      'hover:text-primary-600 dark:hover:text-primary-500 group-data-[disabled]:pointer-events-none',
  },
  toggle: {
    track: 'peer-checked:[&>div:last-child]:!left-[calc(100%-1.25rem)]',
  },
  checkbox: {
    decoratorIcon: '!top-0 !left-[calc(66%/(2*2))]',
  },
  'family:dropdown': {
    option: '!ml-0',
    selectedIcon: 'hidden',
    listitem: 'group/listitem hover:cursor-pointer',
  },
};
