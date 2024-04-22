import { makeAutoObservable } from 'mobx';
import { type ICarDto } from '@/entities/car';

export class ManagePanelStore {
  selectedCarId: number | null = null;

  carValues: ICarDto = {
    name: '',
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }

  selectCar = (id: number, values: ICarDto) => {
    this.selectedCarId = id;
    this.carValues = values;
  };

  resetSelection = () => {
    console.log('reset');
    this.selectedCarId = null;
    this.carValues = {
      name: '',
      color: '#000000',
    };
  };
}
