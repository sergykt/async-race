import { type ReactNode, type FC } from 'react';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/queryClient';

interface IQueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider: FC<IQueryClientProviderProps> = ({ children }) => (
  <TanStackQueryClientProvider client={queryClient}>{children}</TanStackQueryClientProvider>
);
