import { OrderDirection } from '@/shared/const/OrderDirection';
import { type IWinner } from '../model/types';

export type IWinnerDto = Omit<IWinner, 'id'>;

export enum WinnersSortBy {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export interface IWinnersParams {
  limit: number;
  page: number;
  sort: WinnersSortBy;
  order: OrderDirection;
}
