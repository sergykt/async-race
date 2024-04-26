import { makeAutoObservable } from 'mobx';
import { type ICarDto } from '@/entities/car';
import React from 'react';
import { carStartPositionStyle } from '../lib/animation';

export class RaceTrackStore {
  page = 1;

  limit = 7;

  selectedCarId: number | null = null;

  carValues: ICarDto = {
    name: '',
    color: '#000000',
  };

  carsStyles: Record<string, React.CSSProperties> = {};

  constructor() {
    makeAutoObservable(this);
  }

  selectCar = (id: number, values: ICarDto) => {
    this.selectedCarId = id;
    this.carValues = values;
  };

  resetSelection = () => {
    this.selectedCarId = null;
    this.carValues = {
      name: '',
      color: '#000000',
    };
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setLimit = (limit: number) => {
    this.limit = limit;
  };

  getCarStyle = (id: number) => {
    return this.carsStyles[id] ?? carStartPositionStyle;
  };

  setCarStyle = (id: number, style: React.CSSProperties) => {
    this.carsStyles[id] = style;
  };

  resetCarStyle = (id: number) => {
    this.carsStyles[id] = carStartPositionStyle;
  };
}
