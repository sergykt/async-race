export const routes = {
  garagePath: (id?: number) => ['/garage', id].join('/'),
  enginePath: () => '/engine',
  winnersPath: (id?: number) => ['/winners', id].join('/'),
};
