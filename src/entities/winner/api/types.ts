import { type IWinner } from '../model/types';

export type IWinnerDto = Omit<IWinner, 'id'>;
