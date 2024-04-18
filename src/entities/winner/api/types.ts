import { type IWinner } from '../model/types';

export type IWinnerDto = Omit<IWinner, 'id'>;

export type SortBy = 'id' | 'wins' | 'time';
export type OrderBy = 'ASC' | 'DESC';

export interface IWinnersParams {
  limit: number;
  page: number;
  sort: SortBy;
  order: OrderBy;
}
