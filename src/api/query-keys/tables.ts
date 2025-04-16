export const tableKeys = {
  all: ['tables'] as const,
  list: () => [...tableKeys.all, 'list'] as const,
  detail: (id: number) => [tableKeys.all, 'detail', id] as const,
};
