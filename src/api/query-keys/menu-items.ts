export const menuItemsKeys = {
  all: ['menu-items'] as const,
  list: () => [...menuItemsKeys.all, 'list'] as const,
};
