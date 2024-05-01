import { type ChangeEvent } from 'react';
import { makeAutoObservable } from 'mobx';
import { type ICarDto } from '@/entities/car';

const defaultValues: ICarDto = {
  name: '',
  color: '#000000',
};

export class ManagePanelStore {
  carValues: ICarDto = defaultValues;

  selectedCarId: number | null = null;

  createFormValues = defaultValues;

  updateFormValues = defaultValues;

  constructor() {
    makeAutoObservable(this);
  }

  selectCar = (id: number, values: ICarDto) => {
    this.selectedCarId = id;
    this.updateFormValues = values;
  };

  onChangeCreateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.createFormValues = {
      ...this.createFormValues,
      [name]: value,
    };
  };

  onChangeUpdateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.updateFormValues = {
      ...this.updateFormValues,
      [name]: value,
    };
  };

  resetCreateForm = () => {
    this.createFormValues = defaultValues;
  };

  resetUpdateForm = () => {
    this.selectedCarId = null;
    this.updateFormValues = defaultValues;
  };
}
