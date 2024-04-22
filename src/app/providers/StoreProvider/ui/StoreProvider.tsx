import { type FC, type ReactNode } from 'react';
import { StoreContext } from '@/shared/lib/store';
import { rootStore } from '../model/rootStore';

interface IStoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<IStoreProviderProps> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);
