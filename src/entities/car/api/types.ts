import { type ICar } from '../model/types';

export type ICarDto = Omit<ICar, 'id'>;

export interface IRaceResult {
  success: boolean;
}

export interface ICarParams {
  page: number;
  limit: number;
}
