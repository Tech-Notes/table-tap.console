export const ordersKeys = {
  all: ['orders'] as const,
  list: () => [...ordersKeys.all, 'list'] as const,
  detail: (id: number) => [...ordersKeys.all, 'detail', id] as const,
};
