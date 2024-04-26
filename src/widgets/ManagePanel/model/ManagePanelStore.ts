import { makeAutoObservable } from 'mobx';
import { type ICarDto } from '@/entities/car';

const defaultValues: ICarDto = {
  name: '',
  color: '#000000',
};

export class ManagePanelStore {
  selectedCarId: number | null = null;

  carValues: ICarDto = defaultValues;

  constructor() {
    makeAutoObservable(this);
  }

  selectCar = (id: number, values: ICarDto) => {
    this.selectedCarId = id;
    this.carValues = values;
  };

  resetSelection = () => {
    this.selectedCarId = null;
    this.carValues = defaultValues;
  };
}
