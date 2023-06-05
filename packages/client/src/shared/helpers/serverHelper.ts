export const isServer = () =>
  window === undefined ||
  typeof window === undefined ||
  document === undefined ||
  typeof document === undefined;
